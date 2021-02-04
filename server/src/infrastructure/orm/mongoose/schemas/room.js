const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Room", roomSchema);
