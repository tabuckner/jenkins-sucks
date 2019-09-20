const helpers = require('../util/helpers');

const devModeChokeMiddleware = (req, res, next) => {
  
  if (helpers.appInDevMode()) {
    return res.status(200).send('Dev mode is enabled so I\'m choking your resopnses. Don\'t be mad.');
  }
  next();
}

module.exports = devModeChokeMiddleware;
