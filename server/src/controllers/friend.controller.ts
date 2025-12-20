import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  acceptFriendRequestService,
  declineFriendRequestService,
  getAllFriendsService,
  getFriendRequestService,
  sendFriendRequestService,
} from "../services/friend.service";

export const sendFriendRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    const { to, message } = req.body;
    const from = req.user._id;
    const request = await sendFriendRequestService(from, to, message);

    return res
      .status(HTTPSTATUS.CREATED)
      .json({ message: "Gửi lời mời kết bạn thành công", request });
  }
);

export const getAllFriendsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const friends = await getAllFriendsService(userId);

    return res.status(HTTPSTATUS.OK).json({ friends });
  }
);

export const getFriendRequestsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const { sent, received } = await getFriendRequestService(userId);
    return res.status(HTTPSTATUS.OK).json({ sent, received });
  }
);

export const acceptFriendRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const userId = req.user._id;
    const { message, newFriend } = await acceptFriendRequestService(
      requestId,
      userId
    );

    return res.json(HTTPSTATUS.OK).json({ message, newFriend });
  }
);
export const declineFriendRequestController = asyncHandler(
  async (req: Request, res: Response) => {
    const { requestId } = req.params;
    const userId = req.user._id;
    await declineFriendRequestService(requestId, userId);

    return res.json(HTTPSTATUS.OK);
  }
);
