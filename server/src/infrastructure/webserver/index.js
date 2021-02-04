const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

module.exports = (deps) => {
  const app = express();

  app.deps = deps;

  app.use(morgan("combined"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  return app;
};
