const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    room: { type: Schema.Types.ObjectId, ref: "Room" },
    content: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Message", messageSchema);
