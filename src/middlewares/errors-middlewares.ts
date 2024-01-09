import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { AppError } from "@/protocols";


export default function errorHandlingMiddleware(
  error: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) {
  if (error.name === "notFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({message: error.message});
  }

  if (error.name === "balanceBelowAmount" || error.name === "gameWasFinished") {
    return res.status(httpStatus.CONFLICT).send({message: error.message});
  }

  console.log(error);
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
