"use strict";

module.exports = async ({ dto, repository }) => {
  return repository.persist(dto);
};
