const responseSerializer = require("../../serializers/response-serializer");

module.exports = class {
  constructor(socket) {
    this.id = socket.id;
    this.userId = socket.auth.userId;
    this.eventPropagator = socket.auth.deps.eventPropagator;
  }

  propagateEvent(event, data) {
    this.eventPropagator.propagateEvent({
      event,
      data: responseSerializer(data),
      socketId: this.socketId,
      userId: this.userId,
    });
  }

  emitToRoom(event, data) {
    this.eventPropagator.emitToRoom({
      event,
      data: responseSerializer(data),
      socketId: this.socketId,
      userId: this.userId,
    });
  }

  emitToUser(event, data) {
    this.eventPropagator.emitToUser({
      event,
      data: responseSerializer(data),
      socketId: this.socketId,
      userId: this.userId,
    });
  }

  emitToAuthenticated(event, data) {
    this.eventPropagator.emitToAuthenticated({
      event,
      data: responseSerializer(data),
      socketId: this.socketId,
      userId: this.userId,
    });
  }

  emitToAll(event, data) {
    this.eventPropagator.emitToAll({
      event,
      data: responseSerializer(data),
      socketId: this.socketId,
      userId: this.userId,
    });
  }

  error(error) {
    this.emitToUser("error", error.stack);
  }
};
