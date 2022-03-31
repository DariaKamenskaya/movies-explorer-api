const express = require('express');

const {
  getCards,
  deleteCardById,
  createCard,
  putCardlike,
  deleteCardLike,
} = require('../controllers/movie');
const {
  validateCardId,
  createCardValidation,
} = require('../middlewares/validatons');

const moviesRoutes = express.Router();

moviesRoutes.get('/', getCards);

moviesRoutes.delete('/:cardId', validateCardId, deleteCardById);

moviesRoutes.put('/:cardId/likes', validateCardId, putCardlike);

moviesRoutes.delete('/:cardId/likes', validateCardId, deleteCardLike);

moviesRoutes.post('/', createCardValidation, express.json(), createCard);

exports.moviesRoutes = moviesRoutes;
