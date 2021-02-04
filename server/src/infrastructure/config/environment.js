"use strict";

require("dotenv-flow").config();

const constants = require("./constants");

module.exports = (() => {
  const environment = {
    server: {
      port: process.env.PORT || 3000,
    },
    database: {
      dialect:
        process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
      url: process.env.DATABASE_URI || "",
    },
    security: {
      secretKey: process.env.SECURITY_SECRET_KEY || "",
    },
  };

  return environment;
})();
