const moviesRouter = require('express').Router();
const { movieIdValidation, addMovieValidation } = require('../validation/movies-valid');
const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getAllMovies);
moviesRouter.post('/', addMovieValidation, addMovie);
moviesRouter.delete('/:moviesId', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
