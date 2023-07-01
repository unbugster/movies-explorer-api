const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

const User = require('../models/user');
const customError = require('../errors');

const config = require('../config');

const {
  BAD_REQUEST,
  USER_NOT_FOUND_MESSAGE,
  EXISTING_EMAIL_MESSAGE,
  NO_LOGIN_MESSAGE,
} = require('../utils/errorMessages');

const checkUser = (user, res) => {
  if (!user) {
    throw new customError.NotFound(USER_NOT_FOUND_MESSAGE);
  }
  return res.send(user);
};

const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error instanceof Error.CastError) {
        return next(new customError.BadRequest(BAD_REQUEST));
      }
      next(error);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create(
        {
          email,
          name,
          password: hash,
        },
      )
        .then((newUser) => {
          res.status(201).send({
            email: newUser.email,
            name: newUser.name,
          });
        })
        .catch((error) => {
          if (error instanceof Error.ValidationError) {
            return next(new customError.BadRequest(BAD_REQUEST));
          }
          if (error.code === 11000) {
            return next(new customError.Conflict(EXISTING_EMAIL_MESSAGE));
          }
          next(error);
        });
    }).catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new customError.Unauthorized(NO_LOGIN_MESSAGE));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new customError.Unauthorized(NO_LOGIN_MESSAGE));
        }

        const token = jwt.sign(
          { _id: user._id },
          config.JWT_SECRET,
          { expiresIn: '7d' },
        );

        return res.send({ token });
      });
    })
    .catch(next);
};

const editUserProfile = (req, res, next) => {
  const id = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error instanceof Error.ValidationError) {
        return next(new customError.BadRequest(BAD_REQUEST));
      }
      if (error.code === 11000) {
        return next(new customError.Conflict(EXISTING_EMAIL_MESSAGE));
      }
      next(error);
    });
};

module.exports = {
  getUserProfile,
  createUser,
  login,
  editUserProfile,
};
