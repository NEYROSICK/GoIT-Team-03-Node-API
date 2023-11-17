const { Schema, model } = require("mongoose");

const petSchema = new Schema(
  {
    title: String,
    name: String,
    date: String,
    type: String,
    sex: String,
    location: String,
    price: String,
    comments: String,
    avatarURL: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

module.exports = Pet;
