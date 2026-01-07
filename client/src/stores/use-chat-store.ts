import { chatService } from "@/services/chat-service";
import type { IChatState } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./use-auth-store";

export const useChatStore = create<IChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      convoLoading: false, // conversation loading
      messageLoading: false,

      setActiveConversation: (id) => set({ activeConversationId: id }),
      reset: () =>
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          convoLoading: false,
          messageLoading: false,
        }),
      fetchConversations: async () => {
        try {
          set({ convoLoading: true });
          const { conversations } = await chatService.fetchConversations();

          set({ conversations, convoLoading: false });
        } catch (error) {
          console.error("Lỗi xảy ra khi fetchConversations:", error);
          set({ convoLoading: false });
        }
      },
      fetchMessages: async (conversationId) => {
        const { activeConversationId, messages } = get();
        const { user } = useAuthStore.getState();

        const convoId = conversationId ?? activeConversationId;
        if (!convoId) return;

        const current = messages?.[convoId];
        const nextCursor =
          current?.nextCursor === undefined ? "" : current?.nextCursor;
        if (nextCursor === null) return;
        set({ messageLoading: true });

        try {
          const { messages: data, cursor } = await chatService.fetchMessages(
            convoId,
            nextCursor
          );
          const processed = data.map((message) => ({
            ...message,
            isOwn: message.senderId === user?._id, // to render message from 2 different direction
          }));

          set((state) => {
            const prev = state.messages[convoId].items ?? [];
            const merged =
              prev.length > 0 ? [...processed, ...prev] : processed;

            return {
              messages: {
                ...state.messages,
                [convoId]: {
                  items: merged,
                  hasMore: !!cursor,
                  nextCursor: cursor ?? null,
                },
              },
            };
          });
        } catch (error) {
          console.error("Lỗi xảy ra khi fetchMessages:", error);
        } finally {
          set({ messageLoading: false });
        }
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({ conversation: state.conversations }),
    }
  )
);
