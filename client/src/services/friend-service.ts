import { fetchData, postData } from "@/lib/axios";
import type {
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
};
