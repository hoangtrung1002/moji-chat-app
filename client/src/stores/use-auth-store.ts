import { authService } from "@/services/auth-service";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<IAuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },
  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });
      await authService.signUp(username, password, email, firstName, lastName);
      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập."
      );
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký không thành công.");
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (identifier, password) => {
    try {
      set({ loading: true });
      const { accessToken } = await authService.signIn(identifier, password);
      set({ accessToken });
      toast.success("Chào mừng trở lậi với Moji 🎉");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập không thành công!");
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Logout thành công");
    } catch (error) {
      console.log(error);
      toast.error("Lỗi xảy ra khi l");
    }
  },
}));
