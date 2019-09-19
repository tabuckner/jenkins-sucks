const devModeChokeMiddleware = (req, res, next) => {
  const DEV_MODE = process.env.DEV || process.env.DEV_MODE;
  if (DEV_MODE === true || DEV_MODE === 'true') {
    return res.status(200).send({
      message: 'Early bail. `DEV_MODE` enabled.'
    });
  }
  next();
}

module.exports = devModeChokeMiddleware;
