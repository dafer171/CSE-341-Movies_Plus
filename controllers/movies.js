const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('movies')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to find a movie.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('movie')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createMovie = async (req, res) => {
  try {
    if (
      !req.body.movieTitle ||
      !req.body.movieAuhorName ||
      !req.body.movieAuhorLastName ||
      !req.body.movieGenre ||
      !req.body.movieYear
    ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const movie = {
      movieTitle: req.body.movieTitle,
      movieAuhorName: req.body.movieAuhorName,
      movieAuhorLastName: req.body.movieAuhorLastName,
      movieGenre: req.body.movieGenre,
      movieYear: req.body.movieYear
    };
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the movie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const moviesId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const movie = {
      movieTitle: req.body.movieTitle,
      movieAuhorName: req.body.movieAuhorName,
      movieAuhorLastName: req.body.movieAuhorLastName,
      movieGenre: req.body.movieGenre,
      movieYear: req.body.movieYear
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .replaceOne({ _id: moviesId }, movie);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the movie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const moviesId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('movies')
      .remove({ _id: moviesId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the movie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};
