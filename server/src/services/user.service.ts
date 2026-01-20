import UserModel from "../models/User.model";
import { NotFoundException } from "../utils/app-error";

export async function searchUserService(username: string) {
  const user = await UserModel.findOne({ username }).select(
    "_id displayName username avatarUrl",
  );
  if (!user) throw new NotFoundException("Người không tồn tại");
  return user;
}
