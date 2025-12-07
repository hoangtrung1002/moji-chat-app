import mongoose from "mongoose";
import { Env } from "./env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error: ", error);
    process.exit(1);
  }
};
