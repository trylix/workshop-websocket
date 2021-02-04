module.exports = (server, callback) => {
  server.on("connection", async (socket) => {
    if (socket.auth) {
      const { userId, deps } = socket.auth;

      deps.socketState.add(userId, socket);

      socket.emit("authenticated", userId);

      socket.on("disconnect", async () => {
        deps.socketState.remove(userId, socket);

        socket.removeAllListeners("disconnect");
      });
    }

    callback(socket);
  });
};
