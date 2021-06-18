import { Request, Response, NextFunction } from 'express';
import { CustomError } from './customError';
import { StatusCodes } from 'http-status-codes';

export const errorHandle = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';

  res.status(status).send({ message, success: 1 });
}
