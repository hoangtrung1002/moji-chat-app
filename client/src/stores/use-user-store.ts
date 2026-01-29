import { create } from "zustand";
import { useAuthStore } from "./use-auth-store";
import { userService } from "@/services/user-service";
import { toast } from "sonner";
import type { IUserState } from "@/types";
import { useChatStore } from "./use-chat-store";

export const useUserStore = create<IUserState>((set, get) => ({
  updateAvatarUrl: async (formData) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      const avatarUrl = await userService.uploadAvatar(formData);

      if (user) {
        setUser({
          ...user,
          avatarUrl,
        });
        useChatStore.getState().fetchConversations();
      }
    } catch (error) {
      console.error("Lỗi khi updateAvatarUrl", error);
      toast.error("Upload avatar không thành công!");
    }
  },
}));
