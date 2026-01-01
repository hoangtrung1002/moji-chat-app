import { Router } from "express";
import {
  sendDirectMessageController,
  sendGroupMessageController,
} from "../controllers/message.controller";
import {
  checkFriendShip,
  checkGroupMembership,
} from "../middlewares/friend.middleware";

const messageRouter = Router()
  .post("/direct", checkFriendShip, sendDirectMessageController)
  .post("/group", checkGroupMembership, sendGroupMessageController);

export default messageRouter;
