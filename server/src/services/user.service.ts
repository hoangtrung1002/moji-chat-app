import { uploadImageFromBuffer } from "../middlewares/upload.middleware";
import friendModel from "../models/Friend.model";
import UserModel from "../models/User.model";
import { NotFoundException } from "../utils/app-error";

export async function searchUserService(me: string, username: string) {
  const user = await UserModel.findOne({ username }).select(
    "_id displayName username avatarUrl",
  );
  if (!user) throw new NotFoundException("Người không tồn tại");

  const friendShip = await friendModel.findOne({
    $or: [
      { userA: me, userB: user._id },
      { userA: user._id, userB: me },
    ],
  });

  const isAlreadyFriend = !!friendShip;

  return { user, isAlreadyFriend };
}

export async function uploadAvatarService(
  file: Express.Multer.File,
  userId: string,
) {
  const result = await uploadImageFromBuffer(file.buffer);
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      avatarUrl: result.secure_url,
      avatarId: result.public_id,
    },
    {
      new: true,
    },
  )
    .select("avatarUrl")
    .lean();

  console.log(updatedUser?.avatarUrl);
  return updatedUser?.avatarUrl;
}
