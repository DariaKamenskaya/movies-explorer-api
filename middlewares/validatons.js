const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    }).messages({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "password" - 2',
        'string.max': 'Максимальная длина поля "password" - 30',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
});

exports.patchUserMeValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    }).messages({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
  }),
});

exports.validateUserMovieId = celebrate({
  params: Joi.object().keys({
    userMovieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.number().required()
      .messages({
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка для поля "image"');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка для поля "trailerLink"');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидная ссылка для поля "thumbnail"');
    }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
      .messages({
        'any.required': 'Поле "id" должно быть заполнено',
      }),
  }),
});
