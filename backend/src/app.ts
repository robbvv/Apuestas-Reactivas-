import mongoose from "mongoose"
import express, { NextFunction, Request, Response } from "express";
import config from "./utils/config";
import loginRouter from "./controllers/login"
import usersRouter from "./controllers/user"
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
app.use("/api/bets", betsRouter)

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME });
}

export default app;