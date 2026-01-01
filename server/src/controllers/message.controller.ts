import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  sendDirectMessageService,
  sendGroupMessageService,
} from "../services/message.service";
import { HTTPSTATUS } from "../config/http.config";

export const sendDirectMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const { recipientId, content, conversationId } = req.body;
    const senderId = req.user._id;

    const message = await sendDirectMessageService(
      recipientId,
      content,
      conversationId,
      senderId
    );

    return res.status(HTTPSTATUS.CREATED).json({ message });
  }
);
export const sendGroupMessageController = asyncHandler(
  async (req: Request, res: Response) => {
    const { conversationId, content } = req.body;
    const senderId = req.user._id;
    const conversation = req?.conversation;
    const groupMessage = await sendGroupMessageService(
      conversationId,
      content,
      senderId,
      conversation
    );
    return res.status(HTTPSTATUS.CREATED).json({ groupMessage });
  }
);
