const { Error } = require('mongoose');
const Movie = require('../models/movie');
const customError = require('../errors');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((newMovie) => {
      res.send(newMovie);
    })
    .catch((error) => {
      if (error instanceof Error.ValidationError) {
        return next(new customError.BadRequest('Переданы некорректные данные.'));
      }
      next(error);
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById({ _id: req.params.moviesId })
    .then((movie) => {
      if (!movie) {
        throw new customError.NotFound('Фильм не найден.');
      }
      if (movie.owner.toString() !== userId) {
        throw new customError.Forbidden('Нельзя удалить чужой фильм');
      }

      movie.deleteOne()
        .then(() => res.send({ message: 'Фильм удалён.' }))
        .catch(next);
    })
    .catch((error) => {
      if (error instanceof Error.CastError) {
        return next(new customError.BadRequest('Ошибка удаления. Некорректно введён id.'));
      }
      next(error);
    });
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
