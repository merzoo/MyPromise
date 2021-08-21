module.exports = function all(promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new TypeError("The arguments should be an array!");
  }

  return new Promise((resolve, reject) => {
    try {
      const promiseResultArr = [];
      const len = promiseArr.length;

      for (let i = 0; i < len; i++) {
        promiseArr[i].then((data) => {
          promiseResultArr.push(data);
          if (promiseResultArr.length === len) {
            resolve(promiseResultArr);
          }
        }, reject);
      }
    } catch (e) {
      reject(e);
    }
  });
};
