"use strict";

module.exports = () => {
  const beans = {};

  require("../repositories")(beans);
  require("../security")(beans);
  require("../data-source")(beans);
  require("../delivery")(beans);

  return beans;
};
