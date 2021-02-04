const storeRoom = require("../../application/use-cases/rooms/store-room");
const findRooms = require("../../application/use-cases/rooms/find-rooms");
const getRoom = require("../../application/use-cases/rooms/get-room");
const deleteRoom = require("../../application/use-cases/rooms/delete-room");
const updateRoom = require("../../application/use-cases/rooms/update-room");

const httpResponse = require("../utils/helpers/http-response");

module.exports = {
  async find({ query, deps }) {
    const rooms = await findRooms({
      repository: deps.roomRepository,
      participantId: query.participantId,
    });
    return httpResponse.ok(rooms);
  },

  async get({ params, deps }) {
    const room = await getRoom({
      id: params.roomId,
      repository: deps.roomRepository,
    });
    return httpResponse.ok(room);
  },

  async store({ body: dto, deps }) {
    const room = await storeRoom({
      repository: deps.roomRepository,
      dto,
    });

    room.participants.forEach((participant) =>
      deps.eventPropagator.emitToUser({
        userId: participant._id,
        event: "new_room",
        data: room,
      })
    );

    return httpResponse.created(room);
  },

  async update({ params, body: dto, deps }) {
    await updateRoom({
      id: params.roomId,
      repository: deps.roomRepository,
      dto,
    });

    room.participants.forEach((participantId) => {
      deps.eventPropagator.emitToUser({
        userId: participantId,
        event: "update_room",
        data: room,
      });
    });

    return httpResponse.noContent();
  },

  async delete({ params, deps }) {
    await deleteRoom({
      id: params.roomId,
      repository: deps.roomRepository,
    });

    room.participants.forEach((participantId) =>
      deps.eventPropagator.emitToUser({
        userId: participantId,
        event: "delete_room",
        data: room._id,
      })
    );

    return httpResponse.noContent();
  },
};
