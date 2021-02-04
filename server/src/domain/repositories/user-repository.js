"use strict";

module.exports = class {
  persist(dto) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  merge(id, dto) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  deleteById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  fetchById(id) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  fetchByEmail(email) {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }

  fetchAll() {
    throw new Error("ERR_METHOD_NOT_IMPLEMENTED");
  }
};
