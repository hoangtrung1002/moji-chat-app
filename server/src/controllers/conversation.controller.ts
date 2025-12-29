import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.config";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  createConversationService,
  getConversationService,
} from "../services/conversation.service";

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
export const getMessages = asyncHandler(
  async (req: Request, res: Response) => {}
);
