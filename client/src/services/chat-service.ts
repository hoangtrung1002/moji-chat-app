import api, { fetchData, postData } from "@/lib/axios";
import type {
  IConversationResponse,
  ICreateConversationResponse,
  IFetchMessagesResponse,
  IMessage,
  ISendMessageResponse,
} from "@/types";

interface IFetchMessagesProp {
  messages: IMessage[];
  cursor?: string;
}

const pageLimit = 50;

export const chatService = {
  async fetchConversations(): Promise<IConversationResponse> {
    const response = await fetchData<IConversationResponse>("/conversations");
    return response;
  },
  async fetchMessages(
    id: string,
    cursor?: string,
  ): Promise<IFetchMessagesProp> {
    const response = await fetchData<IFetchMessagesResponse>(
      `/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`,
    );
    return { messages: response.messages, cursor: response.nextCursor };
  },

  async sendDirectMessage(
    recipientId: string,
    content: string = "",
    imgUrl?: string,
    conversationId?: string,
  ) {
    const response = await postData<ISendMessageResponse>("/message/direct", {
      recipientId,
      content,
      imgUrl,
      conversationId,
    });
    return response.message;
  },

  async sendGroupMessage(
    conversationId: string,
    content: string = "",
    imgUrl?: string,
  ) {
    const response = await postData<ISendMessageResponse>("/message/group", {
      conversationId,
      content,
      imgUrl,
    });
    return response.message;
  },

  async markAsSeen(conversationId: string) {
    const res = await api.patch(`/conversations/${conversationId}/seen`);
    return res.data;
  },
  async createConversation(
    type: "direct" | "group",
    name: string,
    memberIds: string[],
  ) {
    const res = await postData<ICreateConversationResponse>("/conversations", {
      type,
      name,
      memberIds,
    });
    return res.conversation;
  },
};
