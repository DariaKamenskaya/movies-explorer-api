const express = require('express');

const {
  getMovies,
  deleteMovieById,
  createMovie,
} = require('../controllers/movie');
const {
  validateMovieId,
  createMovieValidation,
} = require('../middlewares/validatons');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getMovies);

moviesRoutes.post('/', createMovieValidation, express.json(), createMovie);

moviesRoutes.delete('/:movieId', validateMovieId, deleteMovieById);

exports.moviesRoutes = moviesRoutes;
