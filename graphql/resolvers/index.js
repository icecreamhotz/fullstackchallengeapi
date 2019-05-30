const lockerResolver = require("./locker");
const sizeResolver = require("./size");
const userResolver = require("./user");

const rootResolver = {
  ...sizeResolver,
  ...lockerResolver,
  ...userResolver
};

module.exports = rootResolver;
