module.exports = class {
  constructor({ socket }) {
    this.id = socket.id;
    this.userId = socket.auth.userId;
    this.deps = socket.auth.deps;
  }

  emitToRoom(roomId, event, data) {
    this.deps.eventPropagator.emitToRoom({
      event,
      data,
      roomId,
      socketId: this.id,
    });
  }

  emitToUser(event, data) {
    this.deps.eventPropagator.emitToRoom({
      event,
      data,
      userId: this.userId,
      socketId: this.id,
    });
  }

  send(event, data) {
    this.deps.eventPropagator.emitToRoom({
      event,
      data,
      userId: this.userId,
      socketId: this.id,
    });
  }
};
