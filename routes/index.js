const router = require('express').Router();

const customError = require('../errors');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const appAuth = require('./auth');
const { auth } = require('../middlewares/auth');

router.use(appAuth);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new customError.NotFound('404: Cтраница не найдена'));
});

module.exports = router;
