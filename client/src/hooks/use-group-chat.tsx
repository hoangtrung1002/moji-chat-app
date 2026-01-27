import { useChatStore } from "@/stores/use-chat-store";
import { useFriendStore } from "@/stores/use-friend-store";
import type { IFriend } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const useGroupChat = () => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const { friends, getFriends } = useFriendStore();
  const [invitedUsers, setInvitedUsers] = useState<IFriend[]>([]);
  const { createConversation, loading } = useChatStore();

  const handleGetFriends = async () => {
    await getFriends();
  };

  const handleSelectFriend = (friend: IFriend) => {
    setInvitedUsers([...invitedUsers, friend]);
    setSearch("");
  };

  const handleRemoveFriend = (friend: IFriend) => {
    setInvitedUsers(invitedUsers.filter((user) => user._id !== friend._id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (invitedUsers.length === 0) {
        toast.warning("Bạn phải mới ít nhất 1 thành viên vào nhóm");
        return;
      }
      await createConversation(
        "group",
        groupName,
        invitedUsers.map((user) => user._id),
      );
      setGroupName("");
      setSearch("");
      setInvitedUsers([]);
    } catch (error) {
      console.error("Lõi xảy ra khi handleSubmit", error);
    }
  };

  const filteredFriends = friends.filter(
    (friend) =>
      friend.displayName.toLowerCase().includes(search.toLowerCase()) &&
      !invitedUsers.some((user) => user._id === friend._id),
  );
  return {
    groupName,
    search,
    loading,
    friends,
    filteredFriends,
    invitedUsers,
    setGroupName,
    setSearch,
    setInvitedUsers,
    handleGetFriends,
    handleSelectFriend,
    handleRemoveFriend,
    handleSubmit,
  };
};

export default useGroupChat;
