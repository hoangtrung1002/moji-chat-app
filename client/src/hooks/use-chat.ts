import { useChatStore } from "@/stores/use-chat-store";
import type { IMessage } from "@/types";

interface IProp {
  setActiveConversation: (id: string) => void;
  messages: Record<
    string,
    {
      items: IMessage[];
      hasMore: boolean;
      nextCursor?: string | null;
    }
  >;
}

const useChat = ({ setActiveConversation, messages }: IProp) => {
  const { fetchMessages } = useChatStore();
  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      await fetchMessages();
    }
  };

  return { handleSelectConversation };
};

export default useChat;
