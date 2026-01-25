import { fetchData, postData } from "@/lib/axios";
import type {
  IAcceptRequestResponse,
  IGetAllFriendRequestResponse,
  ISearchUsernameResponse,
  ISendFriendRequestResponse,
} from "@/types";

export const friendService = {
  async searchUsername(username: string) {
    const res = await fetchData<ISearchUsernameResponse>(
      `/users/search?username=${username}`,
    );
    return res;
  },

  async sendFriendRequest(to: string, message?: string) {
    const res = await postData<ISendFriendRequestResponse>(
      "/friends/requests",
      { to, message },
    );
    return res;
  },

  async getAllFriendRequests() {
    try {
      const res =
        await fetchData<IGetAllFriendRequestResponse>("/friends/requests");
      const { sent, received } = res;
      return { sent, received };
    } catch (error) {
      console.error("Lỗi khi gửi getAllFriendRequest", error);
    }
  },

  async acceptRequest(requestId: string) {
    try {
      const res = await postData<IAcceptRequestResponse>(
        `/friends/requests/${requestId}/accept`,
      );
      return res.newFriend;
    } catch (error) {
      console.error("Lỗi khi gửi acceptRequest", error);
    }
  },
  async declineRequest(requestId: string) {
    try {
      await postData(`/friends/requests/${requestId}/decline`);
    } catch (error) {
      console.error("Lỗi khi gửi declineRequest", error);
    }
  },
};
