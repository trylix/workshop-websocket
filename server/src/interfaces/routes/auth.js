const routerAdapter = require("../../infrastructure/adapters/express-router-adapter");
const authController = require("../controllers/auth-controller");

module.exports = (router) => {
  router.post("/auth", routerAdapter(authController.store));
};
