import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./chat-window-header";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex w-full h-full bg-transparent">
      <ChatWindowHeader />
      <div className="flex items-center justify-center flex-1 bg-primary-foreground rounded-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mx-auto mb-6 rounded-full size-24 bg-gradient-chat shadow-glow pulse-ring">
            <span className="text-3xl">💬</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-transparent bg-gradient-chat bg-clip-text">
            Chào mừng bạn đến với Moji!
          </h2>
          <p className="text-muted-foreground">
            Chọn một cuộc hội thoại để bắt đầu chat
          </p>
        </div>
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;
