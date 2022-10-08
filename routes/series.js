const express = require('express');
const router = express.Router();

const seriesController = require('../controllers/series');
//const validation = require('../middleware/validate');

router.get('/', seriesController.getAll);

router.get('/:id', seriesController.getSingle);

router.post('/', seriesController.createMovie);

router.put('/:id', seriesController.updateMovie);

router.delete('/:id', seriesController.deleteMovie);

module.exports = router;
