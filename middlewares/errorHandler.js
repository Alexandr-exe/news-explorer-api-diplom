const errorHandler = function errorHandler(err, req, res, next) {
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
};

module.exports = errorHandler;
