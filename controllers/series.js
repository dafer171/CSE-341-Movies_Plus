const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('series')
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
    res.status(400).json('Must use a valid serie id to find a serie.');
  }
  const serieId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('serie')
    .find({ _id: serieId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createSerie = async (req, res) => {
  try {
    if (
      !req.body.serieTitle ||
      !req.body.serieAuhorName ||
      !req.body.serieAuhorLastName ||
      !req.body.serieGenre ||
      !req.body.serieYear ||
      !req.body.watched ||
      !req.body.opinion
    ) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const serie = {
      serieTitle: req.body.serieTitle,
      serieAuhorName: req.body.serieAuhorName,
      serieAuhorLastName: req.body.serieAuhorLastName,
      serieGenre: req.body.serieGenre,
      serieYear: req.body.serieYear,
      watched: req.body.watched,
      opinion: req.body.opinion
    };
    const response = await mongodb.getDb().db().collection('series').insertOne(serie);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the serie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSerie = async (req, res) => {
  try {
    const seriesId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const serie = {
      serieTitle: req.body.serieTitle,
      serieAuhorName: req.body.serieAuhorName,
      serieAuhorLastName: req.body.serieAuhorLastName,
      serieGenre: req.body.serieGenre,
      serieYear: req.body.serieYear,
      watched: req.body.watched,
      opinion: req.body.opinion
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('series')
      .replaceOne({ _id: seriessId }, serie);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the serie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSerie = async (req, res) => {
  try {
    const seriesId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('series')
      .remove({ _id: seriesId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the serie.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createSerie,
  updateSerie,
  deleteSerie
};
