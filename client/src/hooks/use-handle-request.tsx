import { useFriendStore } from "@/stores/use-friend-store";
import { toast } from "sonner";

const useHandleRequest = () => {
  const { acceptRequest, declineRequest, loading, receivedList } =
    useFriendStore();

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast.success("Đã đồng ý kết bạn thành công");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineRequest(requestId);
      toast.info("Đã từ chối kết bạn");
    } catch (error) {
      console.error(error);
    }
  };

  return { handleAccept, handleDecline, loading, receivedList };
};

export default useHandleRequest;
