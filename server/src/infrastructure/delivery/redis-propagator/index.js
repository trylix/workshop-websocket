const { tap } = require("rxjs/operators");

const {
  REDIS_PROPAGATOR: {
    EVENT_EMIT_ALL_NAME,
    EVENT_EMIT_TO_USER_NAME,
    EVENT_EMIT_TO_ROOM_NAME,
    EVENT_SEND_NAME,
  },
} = require("../../config/constants");

module.exports = class {
  constructor({ socketState, redisClient }) {
    this._socketState = socketState;
    this._redisClient = redisClient;

    this._redisClient
      .fromEvent(EVENT_SEND_NAME)
      .pipe(tap(this._consumeSendEvent))
      .subscribe();

    this._redisClient
      .fromEvent(EVENT_EMIT_ALL_NAME)
      .pipe(tap(this._consumeEmitToAllEvent))
      .subscribe();

    this._redisClient
      .fromEvent(EVENT_EMIT_TO_ROOM_NAME)
      .pipe(tap(this._consumeEmitToRoom))
      .subscribe();

    this._redisClient
      .fromEvent(EVENT_EMIT_TO_USER_NAME)
      .pipe(tap(this._consumeEmitToUser))
      .subscribe();
  }

  setSocketServer(server) {
    this._socketServer = server;
    return this;
  }

  _consumeSendEvent = (eventInfo) => {
    const { userId, event, data, socketId } = eventInfo;
    return this._socketState
      .get(userId)
      .filter((socket) => socket.id !== socketId)
      .forEach((socket) => {
        socket.emit(event, data);
      });
  };

  _consumeEmitToAllEvent = (eventInfo) => {
    this._socketServer.emit(eventInfo.event, eventInfo.data);
  };

  _consumeEmitToRoom = (eventInfo) => {
    this._socketServer
      .to(eventInfo.roomId)
      .emit(eventInfo.event, eventInfo.data);
  };

  _consumeEmitToUser = (eventInfo) => {
    return this._socketState
      .get(eventInfo.userId)
      .forEach((socket) => socket.emit(eventInfo.event, eventInfo.data));
  };

  propagateEvent(eventInfo) {
    if (!eventInfo.userId) {
      return false;
    }
    this._redisClient.publish(EVENT_SEND_NAME, eventInfo);
    return true;
  }

  emitToRoom(eventInfo) {
    this._redisClient.publish(EVENT_EMIT_TO_ROOM_NAME, eventInfo);
    return true;
  }

  emitToUser(eventInfo) {
    this._redisClient.publish(EVENT_EMIT_TO_USER_NAME, eventInfo);
    return true;
  }

  emitToAll(eventInfo) {
    this._redisClient.publish(EVENT_EMIT_ALL_NAME, eventInfo);
    return true;
  }
};
