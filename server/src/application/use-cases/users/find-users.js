"use strict";

module.exports = async ({ repository }) => {
  return repository.fetchAll();
};
