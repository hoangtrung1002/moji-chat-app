import { Router } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/auth.controller";

const authRoutes = Router()
  .post("/signup", signUpController)
  .post("/signin", signInController);

export default authRoutes;
