"use strict";

module.exports = async ({ id, repository }) => {
  return repository.fetchById(id);
};
