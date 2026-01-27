import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Env } from "../config/env.config";
import { socketAuthMiddleware } from "../middlewares/socket.middleware";
import { getUserConversationsForSocketIO } from "../services/conversation.service";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const onlineUsers = new Map();

io.on("connection", async (socket) => {
  const user = socket.user;
  // console.log(`${user?.displayName} online với socket ${socket.id}`);

  onlineUsers.set(user?._id, socket.id);
  io.emit("online-users", Array.from(onlineUsers.keys()));

  const conversationIds = await getUserConversationsForSocketIO(
    user?._id?.toString(),
  );
  conversationIds.forEach((id) => socket.join(id));

  socket.on("join-conversation", (conversationId) => {
    socket.join(conversationId);
  });

  if (user?._id) {
    socket.join(user._id.toString());
  }

  socket.on("disconnect", () => {
    onlineUsers.delete(user?._id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
    console.log(`socket disconnected: ${socket.id}`);
  });
});

export { io, app, server };
