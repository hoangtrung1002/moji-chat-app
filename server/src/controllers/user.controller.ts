import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { UnauthorizedException } from "../utils/app-error";
import { searchUserService } from "../services/user.service";

export const authMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user; // retrieve from middleware
  if (!user) throw new UnauthorizedException("Unauthorized");

  return res.status(HTTPSTATUS.OK).json({ user });
});

export const searchUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const usernameRaw = req.user.username;
    const username = typeof usernameRaw === "string" ? usernameRaw.trim() : "";
    if (!username)
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Cần cung cấp username trong query." });

    const user = await searchUserService(username);

    return res.status(HTTPSTATUS.OK).json({ user });
  },
);
