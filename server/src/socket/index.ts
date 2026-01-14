import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Env } from "../config/env.config";
import { socketAuthMiddleware } from "../middlewares/socket.middleware";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

io.on("connection", async (socket) => {
  const user = socket.user;
  console.log(`${user?.displayName} online với socket ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`socket disconnected: ${socket.id}`);
  });
});

export { io, app, server };
