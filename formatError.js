const FormatError = require("easygraphql-format-error");

const formatError = new FormatError([
  {
    name: "UNAVAILABLE_LOCKER",
    message: "This locker is unavailable",
    statusCode: "400"
  }
]);

exports.formatError = formatError;
exports.errorName = formatError.errorName;
