const resolvePromise = (promise2, result, resolve, reject) => {
  // 循环引用问题
  if (result === promise2) {
    reject(new TypeError("error due to circular reference"));
  }

  // 是否已经执行过 onfulfilled 或 rejected
  let consumed = false;
  let thenable;

  if (result instanceof Promise) {
    if (result.status == "pending") {
      result.then(function (data) {
        resolvePromise(promise2, data, resolve, reject);
      }, reject);
    } else {
      result.then(resolve, reject);
    }
    return;
  }

  let isComplexResult =
    ((target) => typeof target == "function" || typeof target === "object") &&
    target !== null;

  if (isComplexResult(result)) {
    try {
      thenable = result.then;
      // 判断返回值是否是Promise类型
      if (typeof thenable === "function") {
        thenable.call(
          result,
          function (data) {
            if (consumed) {
              return;
            }
            consumed = true;

            return resolvePromise(promise2, data, resolve, reject);
          },
          function (error) {
            if (consumed) {
              return;
            }
            consumed = true;

            return reject(error);
          }
        );
      } else {
        resolve(result);
      }
    } catch (e) {
      if (consumed) {
        return;
      }
      consumed = true;
      return reject(e);
    }
  } else {
    resolve(result);
  }
};

module.exports = resolvePromise;
