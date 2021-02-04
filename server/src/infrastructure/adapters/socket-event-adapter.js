const SocketResponse = require("../../interfaces/utils/helpers/socket-response");

module.exports = (socket, handler) => {
  return async (context) => {
    const response = new SocketResponse({
      socket,
    });

    try {
      await handler({ socket, context, response });
    } catch (err) {
      response.emitToUser("error", err.message);
    }
  };
};
