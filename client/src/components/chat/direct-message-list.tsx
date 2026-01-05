import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation } from "@/types";
import DirectMessageCard from "./direct-message-card";

const DirectMessageList = () => {
  const { conversations } = useChatStore();
  if (!conversations) return;

  const directConversations = conversations.filter(
    (conversation: IConversation) => conversation.type === "direct"
  );
  console.log(directConversations);
  return (
    <div className="flex-1 p-2 space-y-2 overflow-y-auto">
      {directConversations.map((conversation: IConversation) => (
        <DirectMessageCard key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
};

export default DirectMessageList;
