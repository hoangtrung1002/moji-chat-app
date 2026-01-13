import { useChatStore } from "@/stores/use-chat-store";
import ChatWelcomeScreen from "./chat-welcome-screen";
import ChatWindowSkeleton from "./chat-window-skeleton";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./chat-window-header";
import ChatWindowBody from "./chat-window-body";
import MessageInput from "./message-input";

const ChatWindowLayout = () => {
  const {
    activeConversationId,
    conversations,
    messageLoading: loading,
  } = useChatStore();
  const selectedConvo =
    conversations.find((c) => c._id === activeConversationId) ?? null;
  if (!selectedConvo) return <ChatWelcomeScreen />;

  if (loading) return <ChatWindowSkeleton />;

  return (
    <SidebarInset className="flex flex-col flex-1 h-full overflow-hidden rounded-sm shadow-md">
      {/* HEADER */}
      <ChatWindowHeader chat={selectedConvo} />
      {/* BODY */}
      <div className="flex-1 overflow-y-auto bg-primary-foreground">
        <ChatWindowBody />
      </div>
      {/* FOOTER */}
      <MessageInput selectedConvo={selectedConvo} />
    </SidebarInset>
  );
};

export default ChatWindowLayout;
