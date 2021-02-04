const routerAdapter = require("../../infrastructure/adapters/express-router-adapter");
const roomController = require("../controllers/room-controller");

module.exports = (router) => {
  router.get("/rooms", routerAdapter(roomController.find));
  router.post("/rooms", routerAdapter(roomController.store));
  router.get("/rooms/:roomId", routerAdapter(roomController.get));
  router.patch("/rooms/:roomId", routerAdapter(roomController.update));
  router.delete("/rooms/:roomId", routerAdapter(roomController.delete));
};
