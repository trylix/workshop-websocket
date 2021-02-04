const SocketState = require("./socket-state");

module.exports = (beans) => {
  beans.socketState = new SocketState();
};
