const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const EmptyError = require('../errors/EmptyError');

const { NODE_ENV, JWT_SECRET } = process.env;

const userInfo = (req, res, next) => {
  const { name } = req.user;
  User.findOne({ name })
    .then((user) => {
      res.status(200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const regexp = /[\W]+/i;
  if (!password || regexp.test(password)) {
    throw new EmptyError('Пароль либо пуст, либо содержит не верное значение');
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    }))

    .then((user) => {
      res.status(201).send({
        id: user._id,
        email: user.email,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
        { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
      res.send({
        token,
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  userInfo,
};
