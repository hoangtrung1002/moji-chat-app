import { useAuthStore } from "@/stores/use-auth-store";
import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const useChat = (selectedConvo?: IConversation) => {
  const {
    activeConversationId,
    setActiveConversation,
    fetchMessages,
    messages,
    conversations,
  } = useChatStore();
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const { user } = useAuthStore();
  const [value, setValue] = useState("");
  const messageItems = messages[activeConversationId!]?.items ?? [];
  const reversedMessages = [...messageItems].reverse();
  const hasMore = messages[activeConversationId!]?.hasMore ?? false;

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);

    if (!messages[id]) {
      await fetchMessages();
    }
  };

  const sendMessage = async () => {
    if (!selectedConvo) return;
    if (!value?.trim()) return;
    const currentValue = value;
    setValue("");
    try {
      if (selectedConvo.type === "direct") {
        const participants = selectedConvo.participants;
        const otherUser = participants.filter((p) => p._id !== user?._id)[0];
        await sendDirectMessage(otherUser._id, currentValue);
      } else {
        await sendGroupMessage(selectedConvo._id, currentValue);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi xảy ra khi gửi tin nhắn. Bạn hãy thử lại!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const fetchMoreMessages = async () => {
    if (!activeConversationId) return;

    try {
      await fetchMessages(activeConversationId);
    } catch (error) {
      console.error("Lỗi xảy ra khi fetch thêm tin nhắn", error);
    }
  };

  return {
    handleKeyPress,
    handleSelectConversation,
    fetchMoreMessages,
    setValue,
    sendMessage,
    value,
    conversations,
    activeConversationId,
    messages,
    reversedMessages,
    hasMore,
    messageItems,
  };
};

export default useChat;
