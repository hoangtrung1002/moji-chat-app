import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { sendDirectMessageService } from "../services/message.service";
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
  async (req: Request, res: Response) => {}
);
