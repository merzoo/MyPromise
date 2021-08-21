module.exports = function (catchFn) {
  return this.then(null, catchFn);
};
