const findRooms = require("../../infrastructure/adapters/socket-event-adapter");

module.exports = {
  async find(socket) {
    const rooms = await findRooms({
      repository: socket.auth.deps.roomRepository,
    });

    socket.emit("get_rooms", rooms);
  },
};
