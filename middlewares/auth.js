const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const WrongTokenError = require('../errors/wrong-token-err');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new WrongTokenError('Ошибка авторизации: токен не начинается с Bearer');
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new WrongTokenError('Ошибка авторизации: не получилось верифицировать токен');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
