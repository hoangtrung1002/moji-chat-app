import { useFriendStore } from "@/stores/use-friend-store";

const useCreateNewChat = () => {
  const { getFriends } = useFriendStore();

  const handleGetFriends = async () => {
    await getFriends();
  };

  return { handleGetFriends };
};

export default useCreateNewChat;
