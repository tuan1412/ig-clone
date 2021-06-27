import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt, { Secret } from 'jsonwebtoken';
import { UserModel, User } from '../modules/auth/user';
import { CustomError } from './customError';

export interface RequestWithUser extends Request {
  user: User;
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
    return;
  }

  try {
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') {
      next(new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
      return;
    }

    const data = jwt.verify(token, process.env.JWT_PRIVATE_KEY as Secret) as {
      userId?: string;
    };
    const user = await UserModel.findById(data?.userId).lean();
    if (!user) {
      next(new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized'));
      return;
    }

    (req as RequestWithUser).user = user;
    next();
  } catch (err) {
    next(new CustomError(StatusCodes.UNAUTHORIZED, (err as Error).message));
  }
};
