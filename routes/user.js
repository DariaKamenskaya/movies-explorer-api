const express = require('express');
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/user');
const { patchUserMeValidation } = require('../middlewares/validatons');

const userRoutes = express.Router();

userRoutes.get('/me', getUserMe);

userRoutes.patch('/me', express.json(), patchUserMeValidation, patchUserMe);

exports.userRoutes = userRoutes;
