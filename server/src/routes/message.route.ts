import { Router } from "express";
import {
  sendDirectMessageController,
  sendGroupMessageController,
} from "../controllers/message.controller";
import { checkFriendShip } from "../middlewares/friend.middleware";

const messageRouter = Router()
  .post("/direct", checkFriendShip, sendDirectMessageController)
  .post("/group", sendGroupMessageController);

export default messageRouter;
