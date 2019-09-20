const helpers = require('./helpers');

const log = (content) => {
  if (helpers.appInDevMode()) {
    console.log(content);
  }
}

const warn = (content) => {
  if (helpers.appInDevMode()) {
    console.warn(content);
  }
}

const error = (content) => {
  if (helpers.appInDevMode()) {
    console.error(content);
  }
}

module.exports = {
  log,
  warn,
  error
};
