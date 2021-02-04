const routerAdapter = require("../../infrastructure/adapters/express-router-adapter");
const messageController = require("../controllers/message-controller");

module.exports = (router) => {
  router.get("/messages", routerAdapter(messageController.find));
  router.post("/messages", routerAdapter(messageController.store));
  router.delete(
    "/messages/:messageId",
    routerAdapter(messageController.delete)
  );
};
