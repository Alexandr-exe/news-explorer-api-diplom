require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const user = require('./routers/users');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
app.use(cookieParser());

app.use(helmet());

const { PORT = 3000 } = process.env;

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/moestrodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(5).required(),
  }),
}), login);

app.use(auth);

app.use('/user', user);
app.use((req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err.code === 11000 && err.name === 'MongoError') {
    statusCode = 409;
    message = 'Пользователь с таким email уже есть';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Запрос неверно сформирован';
  }

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
});

app.use(errorLogger);

start();
