import friendModel from "../models/Friend.model";
import friendRequestModel from "../models/FriendRequest.mode";
import UserModel from "../models/User.model";
import { BadRequestException, NotFoundException } from "../utils/app-error";

export async function sendFriendRequestService(
  from: string,
  to: string,
  message: string,
) {
  if (from === to)
    throw new BadRequestException(
      "Không thể gửi lời mời kết bạn cho chính mình",
    );

  const userExists = await UserModel.exists({ _id: to });
  if (!userExists) throw new NotFoundException("Người dùng không tồn tại");

  let userA = from.toString();
  let userB = to.toString();
  if (userA > userB) {
    [userA, userB] = [userB, userA];
  }

  const [alreadyFriends, existingRequest] = await Promise.all([
    friendModel.findOne({ userA, userB }),
    friendRequestModel.findOne({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    }),
  ]);
  if (alreadyFriends) throw new BadRequestException("Hai người đã là bạn bè");
  if (existingRequest)
    throw new BadRequestException("Đã có lời mời kết bạn đang chờ");

  const request = await friendRequestModel.create({ from, to, message });

  return request;
}

export async function acceptFriendRequestService(
  requestId: string,
  userId: string,
) {
  const request = await friendRequestModel.findById(requestId);
  if (!request) throw new NotFoundException("Không tìm thấy lời mời kết bạn");

  if (request.to.toString() !== userId.toString())
    throw new BadRequestException("Bạn không có quyền chấp nhận lời mời này");

  const friend = await friendModel.create({
    userA: request.from,
    userB: request.to,
  });
  await friendRequestModel.findByIdAndDelete(requestId);

  const from = await UserModel.findById(request.from)
    .select("_id displayName avatarUrl")
    .lean(); // lean() -> the result is JSObject instead of MongoDocument

  const newFriend = {
    _id: from?._id,
    displayName: from?.displayName,
    avatarUrl: from?.avatarUrl,
  };

  return newFriend;
}

export async function declineFriendRequestService(
  requestId: string,
  userId: string,
) {
  const request = await friendRequestModel.findById(requestId);
  if (!request) throw new NotFoundException("Không tìm thấy lời mời kết bạn");
  if (request.to.toString() !== userId.toString())
    throw new BadRequestException("Bạn không có quyền từ chối lời mời này");

  await friendRequestModel.findByIdAndDelete(requestId);
}

export async function getAllFriendsService(userId: string) {
  const friendships = await friendModel
    .find({
      $or: [{ userA: userId }, { userB: userId }],
    })
    .populate("userA", "_id displayName avatarUrl")
    .populate("userB", "_id displayName avatarUrl")
    .lean();

  if (!friendships) return [];

  const friends = friendships.map((friend) =>
    friend.userA._id.toString() === userId.toString()
      ? friend.userB
      : friend.userA,
  );

  return friends;
}

export async function getFriendRequestService(userId: string) {
  const populatedFields = "_id username displayName avatarUrl";
  const [sent, received] = await Promise.all([
    friendRequestModel.find({ from: userId }).populate("to", populatedFields),
    friendRequestModel.find({ to: userId }).populate("from", populatedFields),
  ]);

  return { sent, received };
}
