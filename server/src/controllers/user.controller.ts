import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { UnauthorizedException } from "../utils/app-error";
import {
  searchUserService,
  uploadAvatarService,
} from "../services/user.service";

export const authMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user; // retrieve from middleware
  if (!user) throw new UnauthorizedException("Unauthorized");

  return res.status(HTTPSTATUS.OK).json({ user });
});

export const searchUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const me = req.user._id;
    const usernameRaw = req.query.username;
    const username = typeof usernameRaw === "string" ? usernameRaw.trim() : "";
    if (!username)
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Cần cung cấp username trong query." });

    const { user, isAlreadyFriend } = await searchUserService(me, username);

    return res.status(HTTPSTATUS.OK).json({ user, isAlreadyFriend });
  },
);
export const uploadAvatarController = asyncHandler(
  async (req: Request, res: Response) => {
    const file = req.file;
    const userId = req.user._id;
    if (!file) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "No file uploaded" });
    }

    const avatar = await uploadAvatarService(file, userId);

    if (!avatar) {
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Avatar trả về null" });
    }

    return res.status(HTTPSTATUS.OK).json({ avatarUrl: avatar });
  },
);
