import useHandleRequest from "@/hooks/use-handle-request";
import { Button } from "../ui/button";
import FriendRequestItem from "./friend-request-item";

const ReceivedRequests = () => {
  const { handleAccept, handleDecline, loading, receivedList } =
    useHandleRequest();

  if (!receivedList || receivedList.length === 0)
    return (
      <p className="text-sm text-muted-foreground">
        Bạn chư có lời mời két bạn nào.
      </p>
    );
  return (
    <div className="space-y-3 mt-4">
      {receivedList.map((req) => (
        <FriendRequestItem
          key={req._id}
          type="received"
          requestInfo={req}
          actions={
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleAccept(req._id)}
                disabled={loading}
              >
                Chấp nhận
              </Button>
              <Button
                size="sm"
                variant="destructiveOutline"
                onClick={() => handleDecline(req._id)}
                disabled={loading}
              >
                Từ chối
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ReceivedRequests;
