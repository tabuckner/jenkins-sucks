const callerId = require('caller-id');
const devMode = require('./dev-mode').appInDevMode;

const log = (content) => {

  if (devMode()) {
    console.log(callerId.getDetailedString(), content);
  }
}

const warn = (content) => {
  if (devMode()) {
    console.warn(callerId.getDetailedString(), content);
  }
}

const error = (content) => {
  if (devMode()) {
    console.error(callerId.getDetailedString(), content);
  }
}

module.exports = {
  log,
  warn,
  error
};
