const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(express.json());

module.exports = app;
