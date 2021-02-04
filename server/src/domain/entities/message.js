"use strict";

module.exports = class {
  constructor({ id = null, room, owner, content, createdAt }) {
    this.id = id;
    this.room = room;
    this.owner = owner;
    this.content = content;
    this.createdAt = createdAt;
  }
};
