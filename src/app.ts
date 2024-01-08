import express, { json, Request, Response } from "express";
import "express-async-errors";
import httpStatus from "http-status";
import { participantsRouter, gamesRouter } from "./routers";

const app = express();

app
  .use(json())
  .get("/health", (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send("It's ok!");
  })
  .use("/participants", participantsRouter)
  .use("/games", gamesRouter);
export default app;
