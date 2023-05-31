const moviesRouter = require('express').Router();

const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getAllMovies);
moviesRouter.post('/', addMovie);
moviesRouter.delete('/:moviesId', deleteMovie);

module.exports = moviesRouter;
