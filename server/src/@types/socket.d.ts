import { UserDocument } from "../models/User.model";
import { type Socket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    user?: UserDocument;
  }
}
