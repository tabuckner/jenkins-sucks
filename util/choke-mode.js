const appInChokeMode = () => {
  const CHOKE_MODE = process.env.CHOKE_MODE || process.env.CHOKE;
  return CHOKE_MODE === true || CHOKE_MODE && CHOKE_MODE.length > 0 && CHOKE_MODE.toLowerCase() === 'true';
};

module.exports = {
  appInChokeMode,
};
