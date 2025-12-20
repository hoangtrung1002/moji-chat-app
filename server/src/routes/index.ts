import express from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";
import friendRoutes from "./friend.route";

const router = express.Router();
// public routes
router.use("/auth", authRoutes);

// private routes
router.use("/users", isAuthenticated, userRoutes);
router.use("/friends", isAuthenticated, friendRoutes);

export default router;
