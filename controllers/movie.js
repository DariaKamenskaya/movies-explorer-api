const card = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const WrongDataError = require('../errors/wrong-data-err');
const DeleteCardError = require('../errors/delete-card-err');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await card.find({});
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

exports.deleteCardById = (req, res, next) => {
  const ownerId = req.user._id; // идентификатор текущего пользователя
  card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Нет карточки по заданному id'))
    .then((userCard) => {
      if (!userCard.owner.equals(ownerId)) {
        return next(new DeleteCardError('Чужая карточка не может быть удалена'));
      }
      return userCard.remove()
        .then(() => res.status(200).send(userCard));
    })
    .catch(next);
};

exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    if (!name || !link) {
      throw new WrongDataError('Поля "name" и "link" должны быть заполнены');
    } else {
      const cardNew = await card.create({ name, link, owner: ownerId });
      res.status(201).send({ data: cardNew });
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new WrongDataError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};

exports.putCardlike = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const cardLike = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: ownerId } },
      { new: true },
    );
    if (cardLike) {
      res.status(200).send({ data: cardLike });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new WrongDataError('Невалидный id '));
    } else {
      next(err);
    }
  }
};

exports.deleteCardLike = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const cardDislike = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: ownerId } },
      { new: true },
    );
    if (cardDislike) {
      res.status(200).send({ data: cardDislike });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new WrongDataError('Невалидный id '));
    } else {
      next(err);
    }
  }
};
