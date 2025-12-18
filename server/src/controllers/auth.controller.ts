import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { signInSchema, signUpSchema } from "../validators/auth.validator";
import {
  REFRESH_TOKEN_TTL,
  refreshTokenService,
  signInService,
  signOutService,
  signUpService,
} from "../services/auth.service";
import { HTTPSTATUS } from "../config/http.config";
import { Env } from "../config/env.config";

export const signUpController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = signUpSchema.parse(req.body);
    const user = await signUpService(body);
    return res.status(HTTPSTATUS.CREATED).json({
      message: "User created successfully",
    });
  }
);

export const signInController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = signInSchema.parse(req.body);
    const { user, refreshToken, accessToken } = await signInService(body);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none", //backend, frontend deploy riêng
      maxAge: REFRESH_TOKEN_TTL,
    });

    return res
      .status(HTTPSTATUS.CREATED)
      .json({ message: `User ${user.displayName} logged in`, accessToken });
  }
);

export const signOutController = asyncHandler(
  async (req: Request, res: Response) => {
    // get refresh token from cookie
    const token = req.cookies?.refreshToken;
    // delete refresh token from database
    await signOutService(token);
    // delete refresh token from cookie
    res.clearCookie("refreshToken");
    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "User logout successfully" });
  }
);

export const refreshTokenController = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = await refreshTokenService(refreshToken);
    return res.status(HTTPSTATUS.OK).json({ accessToken });
  }
);
