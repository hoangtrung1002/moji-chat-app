import { useChatStore } from "@/stores/use-chat-store";

const useFriendListModal = () => {
  const { createConversation } = useChatStore();

  const handleAddConversation = async (friendId: string) => {
    await createConversation("direct", "", [friendId]);
  };
  return { handleAddConversation };
};

export default useFriendListModal;
