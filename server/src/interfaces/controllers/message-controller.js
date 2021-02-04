const storeMessage = require("../../application/use-cases/messages/store-message");
const findMessages = require("../../application/use-cases/messages/find-messages");
const deleteMessage = require("../../application/use-cases/messages/delete-message");

const httpResponse = require("../utils/helpers/http-response");

module.exports = {
  async find({ query, deps }) {
    const messages = await findMessages({
      repository: deps.messageRepository,
      roomId: query.roomId,
    });
    return httpResponse.ok(messages);
  },

  async store({ body: dto, deps }) {
    const message = await storeMessage({
      repository: deps.messageRepository,
      dto,
    });

    deps.eventPropagator.emitToRoom({
      roomId: message.room,
      event: "new_message",
      data: message,
    });

    return httpResponse.created(message);
  },

  async delete({ params, deps }) {
    await deleteMessage({
      id: params.messageId,
      repository: deps.messageRepository,
    });
    return httpResponse.noContent();
  },
};
