const usersRouter = require('express').Router();
const { editUserProfileValidation } = require('../validation/users-valid');

const {
  getUserProfile,
  editUserProfile,
} = require('../controllers/users');

usersRouter.get('/me', getUserProfile);
usersRouter.patch('/me', editUserProfileValidation, editUserProfile);

module.exports = usersRouter;
