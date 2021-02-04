"use strict";

module.exports = class {
  persist(dto) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  deleteById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  fetchAll(roomId) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
