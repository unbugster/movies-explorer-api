const jwt = require('jsonwebtoken');
const customError = require('../errors');

const config = require('../config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new customError.Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return next(new customError.Unauthorized('Необходима авторизация!'));
  }

  req.user = payload;

  next();
};

module.exports = { auth };
