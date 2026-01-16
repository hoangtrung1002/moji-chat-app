import { Router } from "express";
import { checkFriendShip } from "../middlewares/friend.middleware";
import {
  createConversation,
  getConversations,
  getMessages,
  markAsSeenController,
} from "../controllers/conversation.controller";

const conversationRoutes = Router()
  .post("/", checkFriendShip, createConversation)
  .get("/", getConversations)
  .get("/:conversationId/messages", getMessages)
  .patch("/:conversationId/seen", markAsSeenController);

export default conversationRoutes;
