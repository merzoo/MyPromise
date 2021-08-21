const Promise = require("./Promise");
const then = require("./then");
const catchs = require("./catch");
const resolve = require("./resolve");
const reject = require("./reject");
const all = require("./all");
const race = require("./race");

Promise.resolve = resolve;
Promise.reject = reject;
Promise.all = all;
Promise.race = race;

Promise.prototype = Object.assign(Object.prototype, {
  then,
  catch: catchs,
});

module.exports = Promise;
