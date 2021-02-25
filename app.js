require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { limiter } = require('./middlewares/limiter');

const corsOptions = {
  origin: ['https://api.apinews.xyz', 'http://localhost:8080', 'https://alexandr-exe.github.io'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'x-requested-with', 'origin', 'accept', 'x-access-token', 'Authorization'],
  credentials: true,
};

const { PORT, DATABASE_URL } = require('./config');

const router = require('./routers/index');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(cookieParser());

app.use(helmet());

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT);
