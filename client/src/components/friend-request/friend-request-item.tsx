import type { IFriendRequest } from "@/types";
import UserAvatar from "../chat/user-avatar";

interface Props {
  requestInfo: IFriendRequest;
  actions: React.ReactNode;
  type: "sent" | "received";
}

const FriendRequestItem = ({ actions, requestInfo, type }: Props) => {
  if (!requestInfo) return;

  const info = type === "sent" ? requestInfo.to : requestInfo.from;
  if (!info) return;
  return (
    <div className="flex items-center justify-between rounded-lg shadow-md border border-primary-foreground p-3">
      <div className="flex items-center gap-3">
        <UserAvatar type="sidebar" name={info.displayName} />
        <div>
          <p className="font-medium">{info.displayName}</p>
          <p className="text-sm text-muted-foreground">@{info.username}</p>
        </div>
      </div>
      {actions}
    </div>
  );
};

export default FriendRequestItem;
