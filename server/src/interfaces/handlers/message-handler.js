const storeMessage = require("../../application/use-cases/messages/store-message");
const getRoom = require("../../application/use-cases/rooms/get-room");

module.exports = {
  async store({ context: dto, socket }) {
    const { deps } = socket.auth;

    const message = await storeMessage({
      repository: deps.messageRepository,
      dto,
    });

    const room = await getRoom({
      id: message.room,
      repository: deps.roomRepository,
    });

    room.participants.forEach((participant) => {
      deps.eventPropagator.propagateEvent({
        userId: participant._id,
        socketId: socket.id,
        roomId: room.id,
        event: "new_message",
        data: message,
      });
    });
  },
};
