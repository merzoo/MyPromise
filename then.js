const resolvePromise = require("./resolvePromise");

function then(onfulfilled, onrejected) {
  // data => data，当onfulfilled不为函数时，让这个值直接传递到下一个promise then
  onfulfilled =
    typeof onfulfilled === "function" ? onfulfilled : (data) => data;

  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error;
        };

  // promise2 将作为 then 的返回值
  let promise2;

  if (this.status === "fulfilled") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (status === "rejected") {
    return (promise2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = onrejected(this.reason);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }

  if (this.status == "pending") {
    return (promise2 = new Promise((resolve, reject) => {
      this.onFulfilledArray.push((value) => {
        try {
          let result = onfulfilled(value);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      this.onRejectedArray.push((reason) => {
        try {
          let result = onrejected(reason);
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
}
