const logger = require('../util/logger');

const devLogMiddleware = (req, res, next) => {
  logger.warn('Request Body', req.body)
  next();
}

module.exports = devLogMiddleware;