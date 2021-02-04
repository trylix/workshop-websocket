window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);

  const authToken = urlParams.get("authToken");

  const eventBuilder = new EventBuilder();

  const socketBuilder = new SocketBuilder({
    socketUrl: "ws://localhost:3000",
    authToken,
  });

  Business.initialize({
    eventBuilder,
    socketBuilder,
  });
};
