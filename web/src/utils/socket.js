class SocketBuilder {
  constructor({ socketUrl, authToken }) {
    this.socketUrl = socketUrl;
    this.authToken = authToken;
    this.onConnect = () => {};
    this.onConnectError = () => {};
    this.onReconnect = () => {};
    this.onReconnectAttempt = () => {};
    this.onReconnectError = () => {};
    this.onReconnectFailed = () => {};
    this.onError = () => {};
    this.onPing = () => {};
    this.onGetRooms = () => {};
    this.onNewRoom = () => {};
    this.onUpdateRoom = () => {};
    this.onUpdateLastMessage = () => {};
    this.onGetMessages = () => {};
    this.onNewMessage = () => {};
    this.onAuthenticated = () => {};
  }

  setOnAuthenticated = fn => {
    this.onAuthenticated = fn;
    return this;
  };

  setOnConnect(fn) {
    this.onConnect = fn;
    return this;
  }

  setOnConnectError(fn) {
    this.onConnectError = fn;
    return this;
  }

  setOnReconnect(fn) {
    this.onReconnect = fn;
    return this;
  }

  setOnReconnectAttempt(fn) {
    this.onReconnectAttempt = fn;
    return this;
  }

  setOnReconnectError(fn) {
    this.onReconnectError = fn;
    return this;
  }

  setOnReconnectFailed(fn) {
    this.onReconnectFailed = fn;
    return this;
  }

  setOnError(fn) {
    this.onError = fn;
    return this;
  }

  setOnPing(fn) {
    this.onPing = fn;
    return this;
  }

  setOnGetRooms(fn) {
    this.onGetRooms = fn;
    return this;
  }

  setOnNewRoom(fn) {
    this.onNewRoom = fn;
    return this;
  }

  setOnUpdateRoom(fn) {
    this.onUpdateRoom = fn;
    return this;
  }

  setOnUpdateLastMessage(fn) {
    this.onUpdateLastMessage = fn;
    return this;
  }

  setOnGetMessages(fn) {
    this.onGetMessages = fn;
    return this;
  }

  setOnNewMessage(fn) {
    this.onNewMessage = fn;
    return this;
  }

  build() {
    const socket = io(this.socketUrl, {
      query: {
        token: this.authToken,
      },
    });

    socket.on('connect', this.onConnect);
    socket.on('connect_error', this.onConnectError);
    socket.on('reconnect', this.onReconnect);
    socket.on('reconnect_attempt', this.onReconnectAttempt);
    socket.on('reconnect_error', this.onReconnectError);
    socket.on('reconnect_failed', this.onReconnectFailed);
    socket.on('error', this.onError);
    socket.on('ping', this.onPing);

    socket.on('get_rooms', this.onGetRooms);
    socket.on('new_room', this.onNewRoom);
    socket.on('update_room', this.onUpdateRoom);
    socket.on('update_last_message', this.onUpdateLastMessage);
    socket.on('get_messages', this.onGetMessages);
    socket.on('new_message', this.onNewMessage);

    socket.on('authenticated', this.onAuthenticated);

    return socket;
  }
}
