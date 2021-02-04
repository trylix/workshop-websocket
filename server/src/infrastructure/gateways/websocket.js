module.exports = (server, callback) => {
  server.on("connection", async (socket) => {
    if (socket.auth) {
      const { userId } = socket.auth;

      socket.emit("authenticated", userId);

      socket.on("disconnect", async () => {
        socket.removeAllListeners("disconnect");
      });

      callback(socket);
    }

    // socket.disconnect();
  });
};
