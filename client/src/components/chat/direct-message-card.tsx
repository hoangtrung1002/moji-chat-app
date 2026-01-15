import useChat from "@/hooks/use-chat";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/use-auth-store";
import type { IConversation, IParticipant } from "@/types";
import ChatCard from "./chat-card";
import StatusBadge from "./status-badge";
import UnreadBadge from "./unread-badge";
import UserAvatar from "./user-avatar";
import { useSocketStore } from "@/stores/use-socket-store";

const DirectMessageCard = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  const { user } = useAuthStore();
  const { onlineUsers } = useSocketStore();
  const { handleSelectConversation, activeConversationId } = useChat();

  if (!user) return;

  const otherUser = conversation.participants.find(
    (p: IParticipant) => p._id !== user._id
  );
  if (!otherUser) return null;
  const unreadCount = conversation.unreadCounts[user._id];
  const lastMessage = conversation.lastMessage?.content ?? "";

  return (
    <ChatCard
      conversationId={conversation._id}
      name={otherUser.displayName ?? ""}
      timestamp={
        conversation.lastMessage?.createdAt
          ? new Date(conversation.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === conversation._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={
        <>
          <UserAvatar
            type="sidebar"
            name={otherUser.displayName ?? ""}
            avatarUrl={otherUser.avatarUrl ?? undefined}
          />
          <StatusBadge
            status={
              onlineUsers.includes(otherUser?._id ?? "") ? "online" : "offline"
            }
          />
          {/* TODO: UNREAD COUNT */}
          {unreadCount > 0 && <UnreadBadge unreadCount={unreadCount} />}
        </>
      }
      subtitle={
        <p
          className={cn(
            "text-sm truncate",
            unreadCount > 0
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {lastMessage}
        </p>
      }
    />
  );
};

export default DirectMessageCard;
