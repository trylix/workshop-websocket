const constants = require("../config/constants");
const environment = require("../config/environment");

module.exports = (beans) => {
  const repositories = {};

  repositories[constants.SUPPORTED_DATABASE.MONGO] = () => {
    require("../repositories/mongo")(beans);
  };

  repositories[environment.database.dialect]();

  return beans;
};
