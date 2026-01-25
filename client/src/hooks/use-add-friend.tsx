import type { IFormValues } from "@/components/chat/add-friend-modal";
import { useFriendStore } from "@/stores/use-friend-store";
import type { IUser } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const useAddFriend = () => {
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [searchUser, setSearchUser] = useState<IUser>();
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const [searchedUsername, setSearchedUsername] = useState("");
  const { loading, searchUsername, addFriend } = useFriendStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({ defaultValues: { username: "", message: "" } });
  const usernameValue = watch("username");

  const handleSearch = handleSubmit(async (data) => {
    const username = data.username.trim();
    if (!username) return;

    setIsFound(null);
    setSearchedUsername(username);

    try {
      const foundUser = await searchUsername(username);
      if (foundUser) {
        setIsFound(true);
        setSearchUser(foundUser.user);
        setIsFriend(foundUser.isAlreadyFriend);
      } else {
        setIsFound(false);
      }
    } catch (error) {
      console.error(error);
      setIsFound(false);
    }
  });

  const handleSend = handleSubmit(async (data) => {
    if (!searchUser) return;

    try {
      const message = await addFriend(searchUser._id, data.message.trim());
      toast.success(message);

      handleCancel();
    } catch (error) {
      console.error("Lỗi xảy ra khi gửi request từ form", error);
    }
  });

  const handleCancel = () => {
    reset();
    setSearchedUsername("");
    setIsFound(null);
  };

  return {
    register,
    handleCancel,
    handleSearch,
    handleSend,
    setIsFound,
    isFriend,
    isFound,
    searchedUsername,
    searchUser,
    loading,
    errors,
    usernameValue,
  };
};

export default useAddFriend;
