import { Request } from "express";
import { UserDocument } from "../models/user.models";
import { ConversationDocument } from "../models/Conversation.model";
declare global {
  namespace Express {
    interface Request {
      user?: null | UserDocument;
      conversation?: ConversationDocument;
    }
  }
}
