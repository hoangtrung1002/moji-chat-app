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
  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      // TODO: fetch messages
    }
  };

  return { handleSelectConversation };
};

export default useChat;
