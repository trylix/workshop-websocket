const eventAdapt = require("../../infrastructure/adapters/socket-event-adapter");
const roomHandler = require("../handlers/room-handler");

module.exports = (socket) => {
  socket.on("get_rooms", eventAdapt(socket, roomHandler.find));
};
