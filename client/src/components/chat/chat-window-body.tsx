import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation, IMessage } from "@/types";
import ChatWelcomeScreen from "./chat-welcome-screen";
import MessageItem from "./message-item";

const ChatWindowBody = () => {
  const {
    activeConversationId,
    conversations,
    messages: allMessages,
  } = useChatStore();
  const messages = allMessages[activeConversationId!]?.items ?? [];
  const selectedConvo: IConversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  const seenBy = selectedConvo?.seenBy ?? [];
  const lastMessageStatus = seenBy.length > 0 ? "seen" : "delivered";
  if (!selectedConvo) return <ChatWelcomeScreen />;

  if (!messages?.length)
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Chưa có tin nhắn nào trong cuộc trò chuyện này.
      </div>
    );

  return (
    <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden beautiful-scrollbar">
        {messages.map((message: IMessage, index) => (
          <MessageItem
            key={message._id ?? index}
            message={message}
            index={index}
            messages={messages}
            selectedConvo={selectedConvo}
            lastMessageStatus={lastMessageStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindowBody;
