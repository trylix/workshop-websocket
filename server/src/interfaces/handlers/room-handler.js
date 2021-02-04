const findMessages = require("../../application/use-cases/messages/find-messages");
const findRooms = require("../../application/use-cases/rooms/find-rooms");

module.exports = {
  async fetchAll({ socket }) {
    const { deps, userId: participantId } = socket.auth;

    const rooms = await findRooms({
      repository: deps.roomRepository,
      participantId,
    });

    socket.emit("get_rooms", rooms);
  },

  async join({ context, socket }) {
    const { roomId } = context;

    const messages = await findMessages({
      repository: socket.auth.deps.messageRepository,
      roomId,
    });

    socket.join(roomId);
    socket.emit("get_messages", messages);
  },
};
