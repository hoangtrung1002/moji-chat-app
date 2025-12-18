import { Router } from "express";
import {
  refreshTokenController,
  signInController,
  signOutController,
  signUpController,
} from "../controllers/auth.controller";

const authRoutes = Router()
  .post("/signup", signUpController)
  .post("/signin", signInController)
  .post("/signout", signOutController)
  .post("/refresh", refreshTokenController);

export default authRoutes;
