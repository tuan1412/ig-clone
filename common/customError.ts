import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  status: number;
  message: string;

  constructor(status = StatusCodes.INTERNAL_SERVER_ERROR, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}