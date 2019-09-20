const devMode = require('../util/dev-mode').appInDevMode;
const chokeMode = require('../util/choke-mode').appInChokeMode;

const devModeChokeMiddleware = (req, res, next) => {
  
  if (devMode() && chokeMode()) {
    return res.status(200).send('Dev mode is enabled so I\'m choking your responses. Don\'t be mad.');
  }
  next();
}

module.exports = devModeChokeMiddleware;
