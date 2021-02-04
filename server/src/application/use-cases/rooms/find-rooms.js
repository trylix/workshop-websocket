"use strict";

module.exports = async ({ participantId, repository }) => {
  return repository.fetchAll(participantId);
};
