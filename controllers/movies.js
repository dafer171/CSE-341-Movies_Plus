const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const moviesId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('movies').find({ _id: moviesId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMovie = async (req, res) => {
  try {
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
      res.status(500).json(response.error || 'Some error occurred while creating the contact.');
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
