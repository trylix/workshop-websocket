const io = require("socket.io");
const jwt = require("jsonwebtoken");

module.exports = (http, deps) => {
  const server = io(http, {
    cors: {
      origin: "*",
    },
    maxHttpBufferSize: 1024,
    pingInterval: 60 * 1000,
    pingTimeout: 4 * 60 * 1000,
  });

  server.use(async (socket, next) => {
    try {
      const { id: userId } = deps.accessTokenManager.decode(
        socket.handshake.query.token
      );

      socket.auth = {
        userId,
        deps,
      };

      return next();
    } catch (err) {
      next(err);
    }
  });
};
