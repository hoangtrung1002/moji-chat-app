import express from "express";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import { isAuthenticated } from "../middlewares/isAuthenticated.middleware";

const router = express.Router();
// public routes
router.use("/auth", authRoutes);

// private routes
router.use("/user", isAuthenticated, userRoutes);

export default router;
