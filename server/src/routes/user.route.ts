import { Router } from "express";
import {
  authMe,
  searchUserController,
  uploadAvatarController,
} from "../controllers/user.controller";
import { upload } from "../middlewares/upload.middleware";

const userRoutes = Router()
  .get("/me", authMe)
  .get("/search", searchUserController)
  .post("/uploadAvatar", upload.single("file"), uploadAvatarController);

export default userRoutes;
