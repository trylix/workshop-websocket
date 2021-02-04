"use strict";

module.exports = async ({ roomId, repository }) => {
  return repository.fetchAll(roomId);
};
