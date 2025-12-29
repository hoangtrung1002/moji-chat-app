import { NextFunction, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import friendModel from "../models/Friend.model";

const pair = (a: string, b: string) => (a < b ? [a, b] : [b, a]);
export async function checkFriendShip(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const me = req.user._id.toString();
    const recipientId = req.body?.recipientId ?? null;
    const memberIds = req.body?.memberIds ?? [];

    if (!recipientId && memberIds.length === 0)
      return res
        .status(HTTPSTATUS.BAD_REQUEST)
        .json({ message: "Cần cung cấp recipientId hoặc memberIds" });

    if (recipientId) {
      const [userA, userB] = pair(me, recipientId);
      const isFriend = await friendModel.findOne({ userA, userB });
      if (!isFriend)
        return res
          .status(HTTPSTATUS.FORBIDDEN)
          .json({ message: "Bạn chưa kết bạn với người này" });
      return next();
    }

    const friendChecks = memberIds.map(async (memberId: string) => {
      const [userA, userB] = pair(me, memberId);
      const friend = await friendModel.findOne({ userA, userB });
      return friend ? null : memberId;
    });
    const results = await Promise.all(friendChecks);
    const notFriends = results.filter(Boolean);
    if (notFriends.length > 0) {
      return res
        .status(HTTPSTATUS.FORBIDDEN)
        .json({ message: "Bạn chỉ có thể thêm bạn bè vào nhóm.", notFriends });
    }
    next();
  } catch (error) {
    console.error("Lỗi xảy ra khi checkFriendship:", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
}
