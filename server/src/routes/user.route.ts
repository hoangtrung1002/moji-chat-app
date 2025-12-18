import { Router } from "express";
import { authMe, test } from "../controllers/user.controller";

const userRoutes = Router().get("/me", authMe).get("/test", test);

export default userRoutes;
