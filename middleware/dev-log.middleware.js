const devLogMiddleware = (req, res, next) => {
  const DEV_MODE = process.env.DEV_MODE || process.env.DEV;
  console.warn(DEV_MODE)
  if (DEV_MODE === true || DEV_MODE && DEV_MODE.length > 0 && DEV_MODE.toLowerCase() === 'true') {
    console.warn(req.body);
  }
  next();
}

module.exports = devLogMiddleware;