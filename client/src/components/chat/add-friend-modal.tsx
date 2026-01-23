import useAddFriend from "@/hooks/use-add-friend";
import { DialogTitle } from "@radix-ui/react-dialog";
import { UserPlus } from "lucide-react";
import SearchForm from "../add-friend-modal/search-form";
import SendFriendRequest from "../add-friend-modal/send-friend-request";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

export interface IFormValues {
  username: string;
  message: string;
}
const AddFriendModal = () => {
  const {
    errors,
    handleCancel,
    handleSearch,
    handleSend,
    setIsFound,
    isFriend,
    isFound,
    loading,
    register,
    searchedUsername,
    usernameValue,
  } = useAddFriend();

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-center items-center size-5 rounded-full hover:bg-sidebar-accent cursor-pointer z-10">
          <UserPlus className="size-4" />
          <span className="sr-only">Kết bạn</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none">
        <DialogHeader>
          <DialogTitle>Kết bạn</DialogTitle>
        </DialogHeader>

        {!isFound && (
          <SearchForm
            register={register}
            errors={errors}
            usernameValue={usernameValue}
            loading={loading}
            isFound={isFound}
            searchedUsername={searchedUsername}
            onSubmit={handleSearch}
            onCancel={handleCancel}
          />
        )}
        {isFound && (
          <SendFriendRequest
            register={register}
            isFriend={isFriend}
            searchedUsername={searchedUsername}
            loading={loading}
            onSubmit={handleSend}
            onBack={() => setIsFound(null)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
