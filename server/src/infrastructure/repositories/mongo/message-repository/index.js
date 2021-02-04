"use strict";

const model = require("../../../orm/mongoose/schemas/message");

const Message = require("../../../../domain/entities/message");
const MessageRepository = require("../../../../domain/repositories/message-repository");

module.exports = class extends (
  MessageRepository
) {
  constructor() {
    super();
  }

  async persist(dto) {
    const document = await model.create({
      owner: dto.owner,
      room: dto.room,
      content: dto.content,
    });
    return new Message(document);
  }

  async deleteById(id) {
    return model.deleteOne({
      _id: id,
    });
  }

  async fetchAll(roomId) {
    const documents = await model
      .find({
        room: roomId,
      })
      .populate("owner")
      .lean();

    return documents.map((document) => {
      return new Message({ id: document._id, ...document });
    });
  }
};
