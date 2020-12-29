const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('./user');
const CustomError = require('../../shared/error');

const { JWT_PRIVATE_KEY, JWT_TIME } = process.env;

const genToken = (userId) => {
  const privateKey = JWT_PRIVATE_KEY;
  const expiredTime = JWT_TIME;

  const token = jwt.sign({
    userId
  }, privateKey, { expiresIn: expiredTime });

  return token;
}

const register = async ({ username, password, confirmPassword }) => {
  if (password !== confirmPassword) {
    throw new CustomError('Password and Confirm password are not matched', 422);
  }

  const existedUser = await UserModel.findOne({ username });
  if (existedUser) {
    throw new CustomError('User is existed', 400);
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = await UserModel.create({ username, password: hashPassword });

  const cloneUser = JSON.parse(JSON.stringify(newUser));
  const { password:newPasswordUser, ...sendClientUser } = cloneUser;
  const token = genToken(newUser._id);

  return { ...sendClientUser, token};
};

const login = async ({ username, password }) => {
  const existedUser = await UserModel.findOne({ username }).lean();
  if (!existedUser) {
    throw new CustomError('Username or password is wrong', 401);
  }

  const { password:passwordUser, _id, ...sendClientUser } = existedUser;

  const samePassword = bcrypt.compareSync(password, passwordUser);
  if (!samePassword) {
    throw new CustomError('Username or password is wrong', 401);
  }

  const token = genToken(_id);
  return { ...sendClientUser, token, _id };
};

const loginOauth = async ({ oauthId, username }) => {
  let user;

  const existedUser = await UserModel.findOne({ oauthId });
  if (!existedUser) {
    user = await UserModel.create({ oauthId, username });
  } else {
    user = existedUser;
  }
  const token = genToken(user._id);
  const cloneUser = JSON.parse(JSON.stringify(user));
  return { ...cloneUser, token };

}

module.exports = {
  register,
  login,
  loginOauth
}
