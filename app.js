const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { routes } = require('./routes');
const {
  login,
  createUser,
} = require('./controllers/user');
const auth = require('./middlewares/auth');
const {
  signUpValidation,
  signInValidation,
} = require('./middlewares/validatons');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

async function main() {
  // подключаемся к серверу mongo
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // роуты, не требующие авторизации - регистрация и логин
  app.post('/signup', express.json(), signUpValidation, createUser);
  app.post('/signin', express.json(), signInValidation, login);

  // авторизация
  app.use(auth);

  // роуты, которым авторизация нужна
  app.use(routes);

  // обработчик ошибок celebrate
  app.use(errors());

  // централизованная обработка ошибок
  app.use((err, req, res, next) => {
    // если у ошибки нет статуса, выставляем 500
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({
        // проверяем статус и выставляем сообщение в зависимости от него
        message: statusCode === 500
          ? 'На сервере произошла ошибка'
          : message,
      });
    next();
  });

  await app.listen(PORT);
}

main();
