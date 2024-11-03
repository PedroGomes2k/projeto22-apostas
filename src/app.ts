import express, { json, Request, Response } from "express";
import "express-async-errors";
import httpStatus from "http-status";
import cors from "cors";
import { participantsRouter, gamesRouter, betsRouter } from "./routers";
import errorHandlingMiddleware from "./middlewares/errors-middleware";

const app = express();

app
  .use(cors())
  .use(json())
  .get("/health", (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send("It's ok!");
  })
  .use("/participants", participantsRouter)
  .use("/games", gamesRouter)
  .use("/bets", betsRouter)
  .use(errorHandlingMiddleware);

export default app;
