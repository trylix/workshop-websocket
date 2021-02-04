module.exports = (socket, handler) => {
  return async (context) => {
    await handler(socket, context);
  };
};
