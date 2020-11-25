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
  return newUser;
};

const login = async ({ username, password }) => {
  const existedUser = await UserModel.findOne({ username });
  if (!existedUser) {
    throw new CustomError('Username or password is wrong', 401);
  }

  const { _id, password: passwordUser } = existedUser;
  const samePassword = bcrypt.compareSync(password, passwordUser);
  if (!samePassword) {
    throw new CustomError('Username or password is wrong', 401);
  }

  const token = genToken(_id);
  return token;
};

module.exports = {
  register,
  login
}
