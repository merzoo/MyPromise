class Promise {
  constructor(executor) {
    this.status = "pending";
    this.value = null;
    this.reason = null;

    this.onFulfilledArray = [];
    this.onRejectedArray = [];

    const resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }

      setTimeout(() => {
        if (this.status === "pending") {
          this.value = value;
          this.status = "fulfilled";

          this.onFulfilledArray.forEach((fn) => fn(value));
        }
      });
    };

    const reject = (reason) => {
      setTimeout(() => {
        if (this.status === "pending") {
          this.reason = reason;
          this.status = "rejected";

          this.onRejectedArray.forEach((fn) => fn(reason));
        }
      });
    };

    executor(resolve, reject);
  }
}
