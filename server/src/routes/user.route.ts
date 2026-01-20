import { Router } from "express";
import { authMe, searchUserController } from "../controllers/user.controller";

const userRoutes = Router()
  .get("/me", authMe)
  .get("/search", searchUserController);

export default userRoutes;
