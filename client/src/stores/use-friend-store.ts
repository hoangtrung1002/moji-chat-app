import { friendService } from "@/services/friend-service";
import type { IFriendStore } from "@/types";
import { create } from "zustand";

export const useFriendStore = create<IFriendStore>((set, get) => ({
  loading: false,
  receivedList: [],
  sentList: [],

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
  getAllFriendRequests: async () => {
    try {
      set({ loading: true });
      const result = await friendService.getAllFriendRequests();
      if (!result) return;
      const { sent, received } = result;

      set({ receivedList: received, sentList: sent });
    } catch (error) {
      console.error("Lỗi xảy ra khi getAllFriendRequests", error);
    } finally {
      set({ loading: false });
    }
  },
  acceptRequest: async (requestId) => {
    try {
      set({ loading: true });
      await friendService.acceptRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r.id !== requestId),
      }));
    } catch (error) {
      console.error("Lỗi xảy khi gửi acceptRequest", error);
    } finally {
      set({ loading: false });
    }
  },
  declineRequest: async (requestId) => {
    try {
      set({ loading: true });
      await friendService.declineRequest(requestId);

      set((state) => ({
        receivedList: state.receivedList.filter((r) => r.id !== requestId),
      }));
    } catch (error) {
      console.error("Lỗi xảy khi gửi declineRequest", error);
    } finally {
      set({ loading: false });
    }
  },
}));
