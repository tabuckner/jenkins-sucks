const appInDevMode = () => {
  const DEV_MODE = process.env.DEV_MODE || process.env.DEV;
  return DEV_MODE === true || DEV_MODE && DEV_MODE.length > 0 && DEV_MODE.toLowerCase() === 'true';
};

module.exports = {
  appInDevMode,
};
