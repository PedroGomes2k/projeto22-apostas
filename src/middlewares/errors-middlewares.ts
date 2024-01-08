import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export type AppError = Error & {
  name: string;
};

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) {

  if (error.name === 'notFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error.message);
  }

  console.log(error);
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}