import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { Env } from "./config/env.config";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import router from "./routes";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: Env.FRONTEND_ORIGIN, credentials: true }));

app.use("/api", router);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(Env.PORT, () => {
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
  });
});
