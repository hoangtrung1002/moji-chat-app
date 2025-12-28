import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createConversationService } from "../services/conversation.service";

export const createConversation = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const conversation = await createConversationService(req.body, userId);
  }
);
export const getConversations = asyncHandler(
  async (req: Request, res: Response) => {}
);
export const getMessages = asyncHandler(
  async (req: Request, res: Response) => {}
);
