import { cn, formatMessageTime } from "@/lib/utils";
import type { IConversation, IMessage, IParticipant } from "@/types";
import UserAvatar from "./user-avatar";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface IProps {
  message: IMessage;
  index: number;
  messages: IMessage[];
  selectedConvo: IConversation;
  lastMessageStatus: "delivered" | "seen";
}

const MessageItem = ({
  index,
  lastMessageStatus,
  message,
  messages,
  selectedConvo,
}: IProps) => {
  const prev = index + 1 < messages.length ? messages[index + 1] : undefined;
  const isShowTime =
    index === 0 ||
    new Date(message.createdAt).getTime() -
      new Date(prev?.createdAt || 0).getTime() >
      300000;
  const isGroupBreak = isShowTime || message.senderId !== prev?.senderId;
  const participant = selectedConvo.participants.find(
    (p: IParticipant) => p._id.toString() === message.senderId.toString(),
  );
  return (
    <>
      {/* time */}
      {isShowTime && (
        <span className="flex justify-center text-xs text-muted-foreground px-1">
          {formatMessageTime(new Date(message.createdAt))}
        </span>
      )}

      <div
        className={cn(
          "flex gap-2 message-bounce mt-1",
          message.isOwn ? "justify-end" : "justify-start",
        )}
      >
        {/* avatar */}
        {!message.isOwn && (
          <div className="w-8">
            {isGroupBreak && (
              <UserAvatar
                type="chat"
                name={participant?.displayName ?? "Moji"}
                avatarUrl={participant?.avatarUrl ?? undefined}
              />
            )}
          </div>
        )}
        {/* message */}
        <div
          className={cn(
            "max-w-xs lg:max-w-md space-y-1 flex flex-col",
            message.isOwn ? "items-end" : "items-start",
          )}
        >
          <Card
            className={cn(
              "p-3",
              message.isOwn
                ? "chat-bubble-sent border-0"
                : "bg-chat-bubble-received",
            )}
          >
            <p className="text-sm leading-relaxed wrap-break-word">
              {message.content}
            </p>
          </Card>

          {/* seen / delivered */}
          {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs px-1.5 py-0.5 h-4 border-0",
                lastMessageStatus === "seen"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {lastMessageStatus}
            </Badge>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageItem;
