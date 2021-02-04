"use strict";

module.exports = class {
  constructor({ id = null, participants, createdAt }) {
    this.id = id;
    this.participants = participants;
    this.createdAt = createdAt;
  }
};
