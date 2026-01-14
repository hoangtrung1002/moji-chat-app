import { create } from "zustand";
import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "./use-auth-store";
import type { ISocketState } from "@/types";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<ISocketState>((set, get) => ({
  socket: null,

  connectSocket: () => {
    const accessToken = useAuthStore.getState().accessToken;
    const existingSocket = get().socket;
    if (existingSocket) return; // avoid creating several sockets

    const socket: Socket = io(baseUrl, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });
    set({ socket });

    socket.on("connect", () => {
      console.log("Đã kết nối với socket");
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
