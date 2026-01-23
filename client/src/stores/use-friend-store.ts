import { friendService } from "@/services/friend-service";
import type { IFriendStore } from "@/types";
import { create } from "zustand";

export const userFriendStore = create<IFriendStore>((set, get) => ({
  loading: false,

  searchUsername: async (username) => {
    try {
      set({ loading: true });

      const user = await friendService.searchUsername(username);

      return user;
    } catch (error) {
      console.error("Lỗi xảy ra khi tìm user bằng username", error);
      return null;
    } finally {
      set({ loading: false });
    }
  },
  addFriend: async (to, message) => {
    try {
      set({ loading: true });
      const resultMessage = await friendService.sendFriendRequest(to, message);
      return resultMessage.message;
    } catch (error) {
      console.error("Lỗi xảy ra khi addFriend", error);
      return "Lỗi xảy ra khi gửi kết bạn. Hãy thử lại";
    } finally {
      set({ loading: false });
    }
  },
}));
