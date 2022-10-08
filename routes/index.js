const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));
router.use('/series', require('./series'));
/*
routes.get('/', (req,res) => {
    res.send('David Peña');
});
*/

module.exports = router;
