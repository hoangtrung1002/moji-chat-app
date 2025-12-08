import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config";
import UserModel from "../models/User.model";
import { UnauthorizedException } from "../utils/app-error";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new UnauthorizedException("Unauthorized, please login");

    // verify token
    const decoded = jwt.verify(token, Env.JWT_SECRET) as jwt.JwtPayload;

    // fetch user
    const user = await UserModel.findById(decoded.userId).select(
      "-hashedPassword"
    );
    if (!user) throw new UnauthorizedException("User does not exist");
    // response user
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}
