function then(onfulfilled, onrejected) {
  onfulfilled =
    typeof onfulfilled === "function" ? onfulfilled : (data) => data;

  onrejected =
    typeof onrejected === "function"
      ? onrejected
      : (error) => {
          throw error;
        };

  if (this.status === "fulfilled") {
    onfulfilled(this.value);
  }

  if (status === "rejected") {
    onrejected(this.reason);
  }

  if (this.status == "pending") {
    this.onFulfilledArray.push(onfulfilled);
    this.onRejectedArray.push(onrejected);
  }
}
