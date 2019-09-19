/**
 * Returns number of minutes in milliseconds.
 * @param {Number} number number of minutes
 */
const minutesToMilliseconds = (number) => {
  return number * 60 * 1000;
}

module.exports = {
  minutesToMilliseconds,
}
