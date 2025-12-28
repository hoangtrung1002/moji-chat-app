import express from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import friendRoutes from "./friend.route";
import messageRouter from "./message.route";
import conversationRoutes from "./conversation.route";

const router = express.Router();
// public routes
router.use("/auth", authRoutes);

// private routes
router.use("/users", isAuthenticated, userRoutes);
router.use("/friends", isAuthenticated, friendRoutes);
router.use("/message", isAuthenticated, messageRouter);
router.use("/conversation", isAuthenticated, conversationRoutes);

export default router;
