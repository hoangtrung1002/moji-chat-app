import { fetchData } from "@/lib/axios";
import type {
  IConversationResponse,
  IFetchMessagesResponse,
  IMessage,
} from "@/types";

interface IFetchMessagesProp {
  messages: IMessage[];
  cursor?: string;
}

const pageLimit = 50;

export const chatService = {
  async fetchConversations(): Promise<IConversationResponse> {
    const response = await fetchData<IConversationResponse>("/conversations/");
    return response;
  },
  async fetchMessages(
    id: string,
    cursor?: string
  ): Promise<IFetchMessagesProp> {
    const response = await fetchData<IFetchMessagesResponse>(
      `/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`
    );
    return { messages: response.messages, cursor: response.cursor };
  },
};
