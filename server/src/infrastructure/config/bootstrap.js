"use strict";

const constants = require("./constants");
const environment = require("./environment");

module.exports = {
  async initialize() {
    if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
      require("../orm/mongoose");
    }
  },
};
