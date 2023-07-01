const appAuth = require('express').Router();

const { login, createUser } = require('../controllers/users');
const {
  signinValidation,
  signupValidation,
} = require('../validation/auth-valid');

appAuth.post('/signup', signupValidation, createUser);
appAuth.post('/signin', signinValidation, login);

module.exports = appAuth;
