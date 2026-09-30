const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl}`);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno',
    path: req.originalUrl
  });
};
