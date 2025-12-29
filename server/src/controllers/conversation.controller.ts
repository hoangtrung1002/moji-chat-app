import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createConversationService,
  getConversationService,
} from "../services/conversation.service";
import { getMessagesService } from "../services/message.service";
import { getMessagesQuerySchema } from "../validators/common";

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
