"use strict";

const http = require("http");

const bootstrap = require("./src/infrastructure/config/bootstrap");
const environment = require("./src/infrastructure/config/environment");
const factory = require("./src/infrastructure/config/factory");
const routes = require("./src/infrastructure/config/routes");

const webserver = require("./src/infrastructure/webserver");
const websocket = require("./src/infrastructure/websocket");

const start = async () => {
  try {
    await bootstrap.initialize();

    const deps = factory();
    const app = webserver(deps);
    const server = http.createServer(app);

    websocket(server, deps);

    routes(app);

    server.listen(environment.server.port, () => {
      const { address, port } = server.address();
      console.log(`server running at ${address.concat(port)}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
