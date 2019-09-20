const devModeChokeMiddleware = (req, res, next) => {
  const DEV_MODE = process.env.DEV || process.env.DEV_MODE;
  if (DEV_MODE === true || DEV_MODE && DEV_MODE.length > 0 && DEV_MODE.toLowerCase() === 'true') {
    return res.status(200).send('Dev mode is enabled so I\'m choking your resopnses. Don\'t be mad.');
  }
  next();
}

module.exports = devModeChokeMiddleware;
