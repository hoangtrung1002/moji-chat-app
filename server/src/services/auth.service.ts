import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Env } from "../config/env.config";
import SessionModel from "../models/Session.model";
import UserModel from "../models/User.model";
import { ForbiddenException, UnauthorizedException } from "../utils/app-error";
import { compareValue, hashValue } from "../utils/bcrypt";
import {
  emailSchema,
  signInSchemaType,
  signUpSchemaType,
} from "../validators/auth.validator";

const ACCESS_TOKEN_TTL = "30m";
export const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

export async function signUpService(body: signUpSchemaType) {
  const { username, firstName, lastName, email, password } = body;
  const duplicate = await UserModel.findOne({ username });
  if (duplicate) throw new UnauthorizedException("User already exist");

  const hashedPassword = await hashValue(password);
  const newUser = UserModel.create({
    username,
    hashedPassword,
    email,
    displayName: `${firstName} ${lastName}`,
  });
  return newUser;
}

export async function signInService(body: signInSchemaType) {
  const { identifier, password } = body;
  if (!identifier) throw new UnauthorizedException("Invalid credentials");
  // check user's input is an email or an username
  const isEmail = emailSchema.safeParse(identifier).success;
  // get user information from database
  const user = await UserModel.findOne(
    isEmail
      ? { email: identifier.toLowerCase() }
      : { username: identifier.toLowerCase() }
  );
  if (!user) throw new UnauthorizedException("Invalid credentials");

  // check password
  const isPasswordValid = await compareValue(password, user.hashedPassword);
  if (!isPasswordValid) throw new UnauthorizedException("Invalid credentials");

  // create access token
  const accessToken = jwt.sign({ userId: user._id }, Env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
  // create refresh token
  const refreshToken = crypto.randomBytes(64).toString("hex");

  // create session to store refresh token
  await SessionModel.create({
    userId: user._id,
    refreshToken,
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
  });

  return { user, refreshToken, accessToken };
}

export async function signOutService(token: string) {
  if (!token) return;
  await SessionModel.deleteOne({ refreshToken: token });
}

export async function refreshTokenService(refreshToken: string) {
  // retrieve token from cookie and check
  if (!refreshToken) throw new UnauthorizedException("Token không tồn tại.");

  // check if it exist in database
  const session = await SessionModel.findOne({ refreshToken });
  if (!session)
    throw new ForbiddenException("Token không hợp lệ hoặc đã hết hạn");

  // check session's expire
  if (session.expiresAt < new Date())
    throw new ForbiddenException("Token đã hết hạn");

  // create a new access token
  const accessToken = jwt.sign({ userId: session.userId }, Env.JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });
  return accessToken;
}
