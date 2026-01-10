import useChat from "@/hooks/use-chat";
import { useAuthStore } from "@/stores/use-auth-store";
import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation } from "@/types";
import ChatCard from "./chat-card";
import UnreadBadge from "./unread-badge";
import GroupChatAvatar from "./group-chat-avatar";

const GroupChatCard = ({ conversation }: { conversation: IConversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversation, messages } =
    useChatStore();
  const { handleSelectConversation } = useChat({
    messages,
    setActiveConversation,
  });

  if (!user) return null;

  const unreadCount = conversation.unreadCounts[user._id];
  const name = conversation.group?.name ?? "";

  return (
    <ChatCard
      conversationId={conversation._id}
      name={name}
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
          {unreadCount > 0 && <UnreadBadge unreadCount={unreadCount} />}
          <GroupChatAvatar
            participants={conversation.participants}
            type="chat"
          />
        </>
      }
      subtitle={
        <p className="text-sm truncate text-muted-foreground">
          {conversation.participants.length} thành viên
        </p>
      }
    />
  );
};

export default GroupChatCard;
