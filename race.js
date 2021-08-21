module.exports = function race(promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new TypeError("The arguments should be an array!");
  }

  return new Promise((resolve, reject) => {
    try {
      const len = promiseArr.len;

      for (let i = 0; i < len; i++) {
        promiseArr[i].then(resolve, reject);
      }
    } catch (e) {
      reject(e);
    }
  });
};
