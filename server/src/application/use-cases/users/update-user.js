"use strict";

module.exports = async ({ id, dto, repository }) => {
  return repository.merge(id, dto);
};
