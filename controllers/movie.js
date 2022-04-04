const movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const WrongDataError = require('../errors/wrong-data-err');
const DeleteCardError = require('../errors/delete-card-err');

exports.getMovies = async (req, res, next) => {
  try {
    const movies = await movie.find({});
    res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
};

exports.deleteMovieById = (req, res, next) => {
  const ownerId = req.user._id; // идентификатор текущего пользователя
  movie.findById(req.params.userMovieId)
    .orFail(() => new NotFoundError('Нет карточки с фильмом по заданному id'))
    .then((userMovie) => {
      if (!userMovie.owner.equals(ownerId)) {
        return next(new DeleteCardError('Чужая карточка с фильмом не может быть удалена'));
      }
      return userMovie.remove()
        .then(() => res.status(200).send(userMovie));
    })
    .catch(next);
};

exports.createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const ownerId = req.user._id;
    /* if (
      !country || !director
      || !duration || !year
      || !description || !image
      || !trailerLink || !nameRU
      || !nameEN || !thumbnail
      || !movieId
    ) {
      throw new WrongDataError('Поля "country", "director", "duration", "year", "description",
      "image", "trailerLink", "nameRU", "nameEN", "movieId" и "thumbnail" должны быть заполнены');
    } else { */
    const movieNew = await movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    res.status(201).send({ data: movieNew });
    // }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new WrongDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
