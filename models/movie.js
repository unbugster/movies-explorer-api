const mongoose = require('mongoose');
const { URL_REGEXP } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: 'Необходимо ввести корректный URL адрес',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: 'Необходимо ввести корректный URL адрес',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: 'Необходимо ввести корректный URL адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);