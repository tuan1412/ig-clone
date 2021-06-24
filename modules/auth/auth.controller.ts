import jwt, { Secret } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../common/customError';
import { User, UserModel } from './user';

const genCode = (userId: string): string => {
  const privateKey = process.env.JWT_PRIVATE_KEY as Secret;
  const expiredTime = process.env.JWT_TIME as string;

  const token = jwt.sign(
    {
      userId,
    },
    privateKey,
    { expiresIn: expiredTime }
  );

  return token;
};

interface AuthDto extends User {
  token: string;
}

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<AuthDto> => {
  const existedUser = await UserModel.findOne({ username });
  if (!existedUser) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'Username or password is wrong'
    );
  }

  const samePassword = bcryptjs.compareSync(password, existedUser.password);
  if (!samePassword) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'Username or password is wrong'
    );
  }

  const token = genCode(existedUser._id);
  return {
    ...existedUser.toJSON(),
    password: '',
    token,
  };
};
