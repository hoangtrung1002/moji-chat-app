import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { Env } from "./config/env.config";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import router from "./routes";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { app, server } from "./socket";

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: Env.FRONTEND_ORIGIN, credentials: true }));

// Configuration
cloudinary.config({
  cloud_name: Env.CLOUDINARY_NAME,
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
});

app.use("/api", router);

app.use(errorHandler);

connectDB().then(() => {
  server.listen(Env.PORT, () => {
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
  });
});
