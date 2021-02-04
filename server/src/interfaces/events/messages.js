const eventAdapter = require("../../infrastructure/adapters/socket-event-adapter");
const messageHandler = require("../handlers/message-handler.js");

module.exports = (socket) => {
  socket.on("new_message", eventAdapter(socket, messageHandler.store));
};
