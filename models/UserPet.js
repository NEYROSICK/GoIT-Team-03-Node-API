const { Schema, model } = require("mongoose");

const userPetSchema = new Schema(
  {
    name: String,
    date: String,
    type: String,
    avatarURl: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const UserPet = model("userpet", userPetSchema);

module.exports = UserPet;
