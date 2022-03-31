const express = require('express');

const { userRoutes } = require('./user');

const { moviesRoutes } = require('./movie');

const routes = express.Router();

const NotFoundError = require('../errors/not-found-err');

routes.use('/users', userRoutes);
routes.use('/movies', moviesRoutes);

routes.use('/', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

exports.routes = routes;
