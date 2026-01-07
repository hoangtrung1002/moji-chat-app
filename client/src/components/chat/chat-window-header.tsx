import { useChatStore } from "@/stores/use-chat-store";
import type { IConversation } from "@/types";
import { SidebarTrigger } from "../ui/sidebar";
import { useAuthStore } from "@/stores/use-auth-store";
import { Separator } from "../ui/separator";
import UserAvatar from "./user-avatar";
import StatusBadge from "./status-badge";
import GroupChatAvatar from "./group-chat-avatar";

const ChatWindowHeader = ({ chat }: { chat?: IConversation }) => {
  const { conversations, activeConversationId } = useChatStore();
  const { user } = useAuthStore();
  let otherUser;
  chat =
    chat ??
    conversations.find(
      (conversation) => conversation._id === activeConversationId
    );

  if (!chat)
    return (
      <header className="sticky top-0 z-10 flex items-center w-full gap-2 px-4 py-2 md:hidden">
        <SidebarTrigger className="-ml-1 text-foreground" />
      </header>
    );

  if (chat.type === "direct") {
    const otherUsers = chat.participants.filter(
      (participant) => participant._id !== user?._id
    );
    otherUser = otherUsers.length > 0 ? otherUsers[0] : null;

    if (!user || !otherUser) return;
  }

  return (
    <header className="sticky top-0 z-10 flex items-center px-4 py-2 bg-background">
      <div className="flex items-center w-full gap-2">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center w-full gap-3 p-2">
          <div className="relative">
            {chat.type === "direct" ? (
              <>
                <UserAvatar
                  type="sidebar"
                  name={otherUser?.displayName || "Moji"}
                  avatarUrl={otherUser?.avatarUrl || undefined}
                />
                <StatusBadge status="offline" />
              </>
            ) : (
              <GroupChatAvatar
                participants={chat.participants}
                type="sidebar"
              />
            )}
          </div>
          <h2 className="font-semibold text-foreground">
            {chat.type === "direct" ? otherUser?.displayName : chat.group?.name}
          </h2>
        </div>
      </div>
    </header>
  );
};

export default ChatWindowHeader;
