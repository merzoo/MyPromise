module.exports = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};
