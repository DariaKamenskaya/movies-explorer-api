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

moviesRoutes.post('/', createMovieValidation, express.json(), createMovie);

moviesRoutes.delete('/:userMovieId', validateUserMovieId, deleteMovieById);

exports.moviesRoutes = moviesRoutes;
