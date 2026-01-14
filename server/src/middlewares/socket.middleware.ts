import { type Socket } from "socket.io";
import { NotFoundException, UnauthorizedException } from "../utils/app-error";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config";
import UserModel from "../models/User.model";

export const socketAuthMiddleware = async (socket: Socket, next: any) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new UnauthorizedException("Token không tồn tại"));
    }

    const decoded = jwt.verify(token, Env.JWT_SECRET) as jwt.JwtPayload;
    if (!decoded) {
      return next(
        new UnauthorizedException("Token không hợp lệ hoặc đã hết hạn")
      );
    }

    const user = await UserModel.findById(decoded.userId).select(
      "-hashedPassword"
    );
    if (!user) {
      return next(new NotFoundException("User không tồn tại"));
    }

    socket.user = user;

    next();
  } catch (error) {
    console.error("Lỗi khi verify JWT trong socketMiddleware", error);
    next(error);
  }
};
