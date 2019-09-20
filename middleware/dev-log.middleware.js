const logger = require('../util/logger');

const devLogMiddleware = (req, res, next) => {
  logger.warn(req.body)
  next();
}

module.exports = devLogMiddleware;