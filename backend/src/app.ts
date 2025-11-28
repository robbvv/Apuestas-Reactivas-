import mongoose from "mongoose"
import express, { NextFunction, Request, Response } from "express";
import config from "./utils/config";
import path from "path"
import loginRouter from "./controllers/login"
import usersRouter from "./controllers/user"
import testingRouter from "./controllers/testing"
import middleware from "./utils/middleware";
import betsRouter from "./controllers/bet"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/bets", betsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  if (req.method !== "GET") {
    return next();
  }

  res.sendFile(path.resolve("dist", "index.html"));
});

if (process.env.NODE_ENV !== "production") {
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME });
}

export default app;