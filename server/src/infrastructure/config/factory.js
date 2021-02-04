"use strict";

module.exports = () => {
  const beans = {};

  require("../repositories")(beans);

  return beans;
};
