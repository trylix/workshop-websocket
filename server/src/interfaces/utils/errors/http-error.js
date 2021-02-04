const httpException = require("../helpers/http-exception");

module.exports = class HttpError extends (
  Error
) {
  constructor(
    message = "Internal server error",
    statusCode = httpException.InternalServerError
  ) {
    super(message);

    this.name = "HttpException";
    this.statusCode = statusCode;
  }
};
