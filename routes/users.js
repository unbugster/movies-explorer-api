const usersRouter = require('express').Router();

const {
  getUserProfile,
  editUserProfile,
} = require('../controllers/users');

usersRouter.get('/me', getUserProfile);
usersRouter.patch('/me', editUserProfile);

module.exports = usersRouter;
