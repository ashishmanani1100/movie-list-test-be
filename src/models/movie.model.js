const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    poster: {
      type: String,
      required: true,
      trim: true
    },
    publishingYear: {
      type: String,
      required: true,
      min: 1900,
      max: 2025,
    }
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
