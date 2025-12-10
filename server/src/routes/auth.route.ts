import { Router } from "express";
import {
  signInController,
  signOutController,
  signUpController,
} from "../controllers/auth.controller";

const authRoutes = Router()
  .post("/signup", signUpController)
  .post("/signin", signInController)
  .post("/signout", signOutController);

export default authRoutes;
