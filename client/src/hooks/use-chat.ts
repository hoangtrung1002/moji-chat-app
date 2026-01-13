import { useAuthStore } from "@/stores/use-auth-store";
import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

// interface IProp {
//   selectedConvo?: IConversation;
// }

const useChat = (selectedConvo?: IConversation) => {
  const { fetchMessages } = useChatStore();
  const { activeConversationId, setActiveConversation, messages } =
    useChatStore();
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const { user } = useAuthStore();
  const [value, setValue] = useState("");
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

  return {
    handleKeyPress,
    handleSelectConversation,
    value,
    setValue,
    sendMessage,
    activeConversationId,
    messages,
  };
};

export default useChat;
