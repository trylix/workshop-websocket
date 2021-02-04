"use strict";

const model = require("../../../orm/mongoose/schemas/room");

const Room = require("../../../../domain/entities/room");
const RoomRepository = require("../../../../domain/repositories/room-repository");

module.exports = class extends (
  RoomRepository
) {
  constructor() {
    super();
  }

  async persist({ participants }) {
    const document = await model.create({
      participants,
    });

    return new Room(document);
  }

  async merge(id, { participants }) {
    return model
      .findByIdAndUpdate(
        id,
        {
          $addToSet: {
            participants: {
              $each: Array.isArray(participants)
                ? participants
                : [participants],
            },
          },
        },
        {
          new: true,
          omitUndefined: true,
        }
      )
      .lean();
  }

  async fetchById(id) {
    const document = await model.findById(id).populate("participants").lean();
    return new Room({ id: document._id, ...document });
  }

  async deleteById(id) {
    return model.findByIdAndDelete(id).lean();
  }

  async fetchAll(participantId) {
    const params = participantId
      ? {
          participants: { $in: [participantId] },
        }
      : {};

    const documents = await model.find(params).populate("participants").lean();

    return documents.map((document) => {
      return new Room({ id: document._id, ...document });
    });
  }
};
