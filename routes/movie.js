const express = require('express');

const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movie');
const {
  validateUserMovieId,
  createMovieValidation,
} = require('../middlewares/validatons');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', express.json(), createMovieValidation, createMovie);

moviesRoutes.delete('/:userMovieId', express.json(), validateUserMovieId, deleteMovieById);

exports.moviesRoutes = moviesRoutes;
