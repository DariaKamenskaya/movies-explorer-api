const express = require('express');

const {
  login,
  createUser,
} = require('../controllers/user');

const auth = require('../middlewares/auth');
const {
  signUpValidation,
  signInValidation,
} = require('../middlewares/validatons');

const { userRoutes } = require('./user');

const { moviesRoutes } = require('./movie');

const routes = express.Router();

const NotFoundError = require('../errors/not-found-err');

// роуты, не требующие авторизации - регистрация и логин
routes.post('/signup', express.json(), signUpValidation, createUser);
routes.post('/signin', express.json(), signInValidation, login);

// авторизация
routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', moviesRoutes);

routes.use('/', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

exports.routes = routes;
