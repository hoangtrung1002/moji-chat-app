import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import { UnauthorizedException } from "../utils/app-error";

export const authMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user; // retrieve from middleware
  if (!user) throw new UnauthorizedException("Unauthorized");

  return res.status(HTTPSTATUS.OK).json({ user });
});

export const test = asyncHandler(async (req: Request, res: Response) => {
  return res.sendStatus(204);
});
