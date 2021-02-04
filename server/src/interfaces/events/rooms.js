const eventAdapter = require("../../infrastructure/adapters/socket-event-adapter");
const roomHandler = require("../handlers/room-handler");

module.exports = (socket) => {
  socket.on("get_rooms", eventAdapter(socket, roomHandler.fetchAll));
  socket.on("join", eventAdapter(socket, roomHandler.join));
};
