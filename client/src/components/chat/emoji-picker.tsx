import { useThemeStore } from "@/stores/use-theme-store";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";
import Emoji, { Theme } from "emoji-picker-react";

interface IProps {
  onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: IProps) => {
  const { isDark } = useThemeStore();
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <Smile className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-12"
      >
        <Emoji
          skinTonesDisabled
          theme={isDark ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={(emojiData) => onChange(emojiData.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
