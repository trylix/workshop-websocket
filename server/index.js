"use strict";

const http = require("http");

const app = require("./src/infrastructure/webserver");

const start = async () => {
  try {
    const server = http.createServer(app);

    server.listen(process.env.PORT || 3000, () => {
      const { address, port } = server.address();
      console.log(`server running at ${address.concat(port)}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();