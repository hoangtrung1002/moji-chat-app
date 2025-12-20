import { Router } from "express";
import {
  acceptFriendRequestController,
  sendFriendRequestController,
  declineFriendRequestController,
  getAllFriendsController,
  getFriendRequestsController,
} from "../controllers/friend.controller";

const friendRoutes = Router()
  .get("/", getAllFriendsController)
  .get("/requests", getFriendRequestsController)
  .post("/requests", sendFriendRequestController)
  .post("/requests/:requestId/accept", acceptFriendRequestController)
  .post("/requests/:requestId/decline", declineFriendRequestController);

export default friendRoutes;
