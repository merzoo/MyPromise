module.exports = function (callback) {
  return this.then(
    (res) => {
      callback();
      return res;
    },
    (rej) => {
      callback();
      return rej;
    }
  );
};
