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
      trim: true,
    },
    publishingYear: {
      type: Number,
      required: true,
      min: 1900,
      max: 2024,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
