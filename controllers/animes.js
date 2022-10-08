const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('animes')
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
    res.status(400).json('Must use a valid anime id to find a anime.');
  }
  const animeId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('animes')
    .find({ _id: animeId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createAnime = async (req, res) => {
  try {
    if (
      !req.body.animeTitle ||
      !req.body.animeAuhorName ||
      !req.body.animeAuhorLastName ||
      !req.body.animeGenre ||
      !req.body.animeYear ||
      !req.body.watched ||
      !req.body.opinion
    ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const anime = {
      animeTitle: req.body.animeTitle,
      animeAuhorName: req.body.animeAuhorName,
      animeAuhorLastName: req.body.animeAuhorLastName,
      animeGenre: req.body.animeGenre,
      animeYear: req.body.animeYear,
      watched: req.body.watched,
      opinion: req.body.opinion
    };
    const response = await mongodb.getDb().db().collection('animes').insertOne(anime);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the anime.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAnime = async (req, res) => {
  try {
    const animesId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const anime = {
      animeTitle: req.body.animeTitle,
      animeAuhorName: req.body.animeAuhorName,
      animeAuhorLastName: req.body.animeAuhorLastName,
      animeGenre: req.body.animeGenre,
      animeYear: req.body.animeYear,
      watched: req.body.watched,
      opinion: req.body.opinion
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('animes')
      .replaceOne({ _id: animesId }, anime);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the anime.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const animesId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('animes')
      .remove({ _id: animesId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the anime.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAnime,
  updateAnime,
  deleteAnime
};
