const jwt = require('jsonwebtoken');

const { JWT_KEYS } = require('../config');
const AuthorizationError = require('../errors/AuthorizationError');

const handleAuthError = (res) => {
  throw new AuthorizationError('Ошибка авторизации');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }
  const token = authorization.replace('Bearer ', '');
  let payload = null;
  try {
    payload = jwt.verify(token, JWT_KEYS);
  } catch (err) {
    return handleAuthError(res);
  }
  req.user = payload;
  return next();
};
