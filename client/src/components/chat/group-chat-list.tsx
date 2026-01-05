import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation } from "@/types";
import GroupChatCard from "./group-chat-card";

const GroupChatList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;

  const groupChats = conversations.filter(
    (conversation: IConversation) => conversation.type === "group"
  );
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {groupChats.map((conversation: IConversation) => (
        <GroupChatCard key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default GroupChatList;
