const ServerError = require("../errors/http-error");

module.exports = {
  ok(body) {
    return {
      statusCode: 200,
      body,
    };
  },
  created(body) {
    return {
      statusCode: 201,
      body,
    };
  },
  noContent() {
    return {
      statusCode: 204,
      body: null,
    };
  },
};
