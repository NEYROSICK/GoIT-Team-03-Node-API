const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for your pet"],
    },
    date: String,
    type: String,
    avatarURl: String,
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

module.exports = Pet;
