const routerAdapter = require("../../infrastructure/adapters/express-router-adapter");
const userController = require("../controllers/user-controller");

module.exports = (router) => {
  router.get("/users", routerAdapter(userController.find));
  router.post("/users", routerAdapter(userController.store));
  router.get("/users/:userId", routerAdapter(userController.get));
  router.patch("/users/:userId", routerAdapter(userController.update));
  router.delete("/users/:userId", routerAdapter(userController.delete));
};
