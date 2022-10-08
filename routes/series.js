const express = require('express');
const router = express.Router();

const seriesController = require('../controllers/series');
//const validation = require('../middleware/validate');

router.get('/', seriesController.getAll);

router.get('/:id', seriesController.getSingle);

router.post('/', seriesController.createSerie);

router.put('/:id', seriesController.updateSerie);

router.delete('/:id', seriesController.deleteSerie);

module.exports = router;
