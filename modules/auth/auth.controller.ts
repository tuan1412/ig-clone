import jwt, { Secret } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../common/customError';
import { User, UserModel, UserDocument } from './user';
interface AuthResponseDto extends User {
  token: string;
}
interface AuthRequestDto {
  username: string;
  password?: string;
  oauthId?: string;
}

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

export const register = async ({
  username,
  password,
}: AuthRequestDto): Promise<AuthResponseDto> => {
  const existedUser = await UserModel.findOne({ username });
  if (existedUser) {
    throw new CustomError(400, 'User is existed');
  }

  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(password as string, salt);
  const newUser = await UserModel.create({ username, password: hashPassword });
  const token = genCode(newUser._id as string);

  return {
    ...newUser.toJSON(),
    password: '',
    token,
  };
};

export const login = async ({
  username,
  password,
}: AuthRequestDto): Promise<AuthResponseDto> => {
  const existedUser = await UserModel.findOne({ username });
  if (!existedUser) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'Username or password is wrong'
    );
  }

  const samePassword = bcryptjs.compareSync(
    password as string,
    existedUser.password
  );
  if (!samePassword) {
    throw new CustomError(
      StatusCodes.UNAUTHORIZED,
      'Username or password is wrong'
    );
  }

  const token = genCode(existedUser._id as string);
  return {
    ...existedUser.toJSON(),
    password: '',
    token,
  };
};

export const loginOauth = async ({
  oauthId,
  username,
}: AuthRequestDto): Promise<AuthResponseDto> => {
  let user: UserDocument;

  const existedUser = await UserModel.findOne({ oauthId });
  if (!existedUser) {
    user = await UserModel.create({ oauthId, username });
  } else {
    user = existedUser;
  }

  const token = genCode(user._id as string);
  return {
    ...user.toJSON(),
    password: '',
    token,
  };
};
