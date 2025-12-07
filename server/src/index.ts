import express from "express";
import "dotenv/config";
import { Env } from "./config/env.config";
import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

// middleware
app.use(express.json());

app.use(errorHandler);

connectDB().then(() => {
  app.listen(Env.PORT, () => {
    console.log(`Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`);
  });
});
