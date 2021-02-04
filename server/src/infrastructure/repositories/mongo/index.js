const UserRepository = require("./user-repository");
const RoomRepository = require("./room-repository");
const MessageRepository = require("./message-repository");

module.exports = (beans) => {
  beans.userRepository = new UserRepository();
  beans.roomRepository = new RoomRepository();
  beans.messageRepository = new MessageRepository();
};
