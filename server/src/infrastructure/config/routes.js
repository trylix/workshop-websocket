const path = require("path");
const fg = require("fast-glob");

const router = require("express").Router();

module.exports = (app) => {
  app.use(router);

  fg.sync("**/src/interfaces/routes/**.js").forEach((file) =>
    require(path.resolve(file))(router)
  );
};
