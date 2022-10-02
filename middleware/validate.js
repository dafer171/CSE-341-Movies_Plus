const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    movieTitle: 'required|string',
    movieAuhorName: 'required|string',
    movieAuhorLastName: 'required|string',
    movieGenre: 'required|string',
    movieYear: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveMovie
};
