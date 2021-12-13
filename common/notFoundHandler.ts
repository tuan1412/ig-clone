import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from './customError';

export const notFoundHandle: RequestHandler = (req, res, next) => {
  const notFoundError = new CustomError(StatusCodes.NOT_FOUND, 'Not found');
  next(notFoundError);
};
