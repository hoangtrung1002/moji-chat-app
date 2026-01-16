import { request, Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createConversationService,
  getConversationService,
  isLastMessageExist,
  markAsSeenService,
} from "../services/conversation.service";
import { getMessagesService } from "../services/message.service";
import { getMessagesQuerySchema } from "../validators/common";
import { resolve } from "dns";

export const createConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const conversation = await createConversationService(req.body, userId);
    return res.status(HTTPSTATUS.CREATED).json({ conversation });
  }
);

export const getConversations = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const conversations = await getConversationService(userId);
    return res.status(HTTPSTATUS.OK).json({ conversations });
  }
);
export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  const { limit, cursor } = getMessagesQuerySchema.parse(req.query);
  const { messages, nextCursor } = await getMessagesService(
    conversationId,
    limit,
    cursor
  );
  return res.status(HTTPSTATUS.OK).json({ messages, nextCursor });
});

export const markAsSeenController = asyncHandler(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;
    const userId = req.user?._id;

    const last = await isLastMessageExist(conversationId);

    if (!last) {
      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "Không có tin nhắn để mark as seen" });
    }
    if (last.senderId.toString() === userId) {
      return res
        .status(HTTPSTATUS.OK)
        .json({ message: "Sender không cần mark as seen" });
    }

    const { seenBy, myUnreadCount } = await markAsSeenService(
      conversationId,
      userId
    );

    return res
      .status(HTTPSTATUS.OK)
      .json({ message: "Marked as Seen", seenBy, myUnreadCount });
  }
);
