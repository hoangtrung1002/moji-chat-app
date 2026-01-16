import { useChatStore } from "@/stores/use-chat-store";
import ChatWelcomeScreen from "./chat-welcome-screen";
import MessageItem from "./message-item";
import type { IConversation, IMessage } from "@/types";
import { useEffect, useState } from "react";

const ChatWindowBody = () => {
  const [lastMessageStatus, setLastMessageStatus] = useState<
    "delivered" | "seen"
  >("delivered");
  const {
    activeConversationId,
    conversations,
    messages: allMessages,
  } = useChatStore();
  const messages = allMessages[activeConversationId!]?.items ?? [];
  const selectedConvo: IConversation = conversations.find(
    (c) => c._id === activeConversationId
  );

  // seen status
  useEffect(() => {
    const lastMessage = selectedConvo?.lastMessage;
    if (!lastMessage) {
      return;
    }

    const seenBy = selectedConvo?.seenBy ?? [];
    setLastMessageStatus(seenBy.length > 0 ? "seen" : "delivered");
  }, [selectedConvo]);

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
