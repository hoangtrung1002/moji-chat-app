import { Router } from "express";
import { userPoint } from "../controllers/user.controller";

const userRoutes = Router().get("/", userPoint);

export default userRoutes;
