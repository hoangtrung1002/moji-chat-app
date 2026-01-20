import useChat from "@/hooks/use-chat";
import type { IConversation } from "@/types";
import { useLayoutEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatWelcomeScreen from "./chat-welcome-screen";
import MessageItem from "./message-item";

const ChatWindowBody = () => {
  const {
    activeConversationId,
    fetchMoreMessages,
    conversations,
    messageItems,
    hasMore,
    reversedMessages,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const key = `chat-scroll-${activeConversationId}`;

  const selectedConvo: IConversation = conversations.find(
    (c) => c._id === activeConversationId,
  );
  const seenBy = selectedConvo?.seenBy ?? [];
  const lastMessageStatus = seenBy.length > 0 ? "seen" : "delivered";

  // scroll down when open conversation
  useLayoutEffect(() => {
    if (!messagesEndRef.current) {
      return;
    }
    messagesEndRef.current?.scrollIntoView({
      block: "end",
    });
  }, [activeConversationId]);

  const handleScrollSave = () => {
    const container = containerRef.current;
    if (!container || !activeConversationId) return;

    sessionStorage.setItem(
      key,
      JSON.stringify({
        scrollTop: container.scrollTop, // current position of the scroll
        scrollHeight: container.scrollHeight, // total scrollable height
      }),
    );
  };

  // keep position when scroll on top to load more messages
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const item = sessionStorage.getItem(key);
    if (item) {
      const { scrollTop } = JSON.parse(item);
      requestAnimationFrame(() => (container.scrollTop = scrollTop));
    }
  }, [messageItems.length]);

  if (!selectedConvo) return <ChatWelcomeScreen />;

  if (!messageItems?.length)
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Chưa có tin nhắn nào trong cuộc trò chuyện này.
      </div>
    );

  return (
    <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div
        id="scrollableDiv"
        ref={containerRef}
        onScroll={handleScrollSave}
        className="flex-1 h-0 flex flex-col-reverse overflow-y-auto overflow-x-hidden beautiful-scrollbar"
      >
        <div ref={messagesEndRef} />
        <InfiniteScroll
          dataLength={messageItems.length}
          next={fetchMoreMessages}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          loader={<p>Đang tải...</p>}
          inverse={true}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "visible",
          }}
        >
          {reversedMessages.map((message, index) => (
            <MessageItem
              key={message._id ?? index}
              message={message}
              index={index}
              messages={reversedMessages}
              selectedConvo={selectedConvo}
              lastMessageStatus={lastMessageStatus}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatWindowBody;
