const jwt = require('jsonwebtoken');
const UserModel = require('../../modules/auth/user');

const { JWT_PRIVATE_KEY } = process.env;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ success: 0, message: 'Unauthorized'});

  try {
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') return res.status(401).send({ success: 0, message: 'Invalid token type'});

    const data = jwt.verify(token, JWT_PRIVATE_KEY);
    const { userId } = data;
    const user = await UserModel.findById(userId);
    if (!user) return res.status(401).send({ success: 0, message: 'Unauthorized'});

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ success: 0, message: err.message || 'Unauthorized' });
  }
}