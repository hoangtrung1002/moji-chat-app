import { fetchData } from "@/lib/axios";
import type { IConversationResponse } from "@/types";

export const chatService = {
  async fetchConversations(): Promise<IConversationResponse> {
    const response = await fetchData<IConversationResponse>("/conversations/");
    return response;
  },
};
