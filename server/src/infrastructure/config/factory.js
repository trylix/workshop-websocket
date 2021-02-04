"use strict";

module.exports = () => {
  const beans = {};

  require("../repositories")(beans);
  require("../security")(beans);

  return beans;
};
