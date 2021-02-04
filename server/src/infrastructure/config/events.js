const path = require("path");
const fg = require("fast-glob");

module.exports = (socket) => {
  fg.sync("**/src/interfaces/events/**.js").forEach((file) =>
    require(path.resolve(file))(socket)
  );
};
