import useChat from "@/hooks/use-chat";
import { useAuthStore } from "@/stores/use-auth-store";
import type { IConversation } from "@/types";
import { ImagePlus, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EmojiPicker from "./emoji-picker";

const MessageInput = ({ selectedConvo }: { selectedConvo: IConversation }) => {
  const { user } = useAuthStore();
  const { sendMessage, value, setValue, handleKeyPress } =
    useChat(selectedConvo);

  if (!user) return;

  return (
    <div className="flex items-center gap-2 p-3 min-h-14 bg-background">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-primary/10 transition-smooth"
      >
        <ImagePlus className="size-4" />
      </Button>
      <div className="flex-1 relative">
        <Input
          onKeyDown={handleKeyPress}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Soạn tin nhắn..."
          className="pr-20 h-9 bg-white border-border/50 focus:border-primary/50 transition-smooth resize-none"
        ></Input>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-8 hover:bg-primary/50 transition-smooth"
          >
            <div>
              <EmojiPicker
                onChange={(emoji: string) => setValue(`${value}${emoji}`)}
              />
            </div>
          </Button>
        </div>
      </div>
      <Button
        onClick={sendMessage}
        className="bg-gradient-chat hover:shadow-glow transition-smooth hover:scale-105"
        disabled={!value.trim()}
      >
        <Send className="size-4 text-white" />
      </Button>
    </div>
  );
};

export default MessageInput;
