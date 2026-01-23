import type { UseFormRegister } from "react-hook-form";
import type { IFormValues } from "../chat/add-friend-modal";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";

interface IProps {
  register: UseFormRegister<IFormValues>;
  isFriend: boolean;
  loading: boolean;
  searchedUsername: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const SendFriendRequest = ({
  isFriend,
  loading,
  onBack,
  register,
  searchedUsername,
  onSubmit,
}: IProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <span className="success-message">
          Tìm thấy <span className="font-semibold">{searchedUsername}</span> rồi
          nè 🎉
        </span>
        <div className="space-y-2">
          {isFriend ? (
            <>
              <p className="text-center text-3xl py-4">
                2 người đã là bạn bè 🤝
              </p>
            </>
          ) : (
            <>
              <Label htmlFor="message" className="text-sm font-semibold">
                Giới thiệu
              </Label>
              <Textarea
                id="mesage"
                rows={3}
                placeholder="Chào bạn ~ Có thể két bạn được không?..."
                className="glass border-border/50 focus:border-primary/50 transition-smooth resize-none"
                {...register("message")}
              />
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="flex-1 glass hover:text-destructive"
            onClick={onBack}
          >
            Quay lại
          </Button>
          <Button
            type="submit"
            disabled={loading || isFriend}
            className="flex-1 bg-gradient-chat text-white hover:opacity-90 transition-smooth"
          >
            {loading ? (
              <span>Đang gửi...</span>
            ) : (
              <>
                <UserPlus className="size-4 mr-2" />
                Kết bạn
              </>
            )}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
};

export default SendFriendRequest;
