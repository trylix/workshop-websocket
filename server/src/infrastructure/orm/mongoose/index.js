"use strict";

const mongoose = require("mongoose");
const environment = require("../../config/environment");

mongoose.connect(environment.database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(
    console,
    "an error occurred on open connection from database:"
  )
);

database.once("open", () => {
  console.log("database connection opened");
});

module.exports = mongoose;
