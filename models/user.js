const { Schema, model } = require("mongoose");

const handleMongooseModel = require("../helpers/handleMongooseModel");
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  token: String,
});
userSchema.post("save", handleMongooseModel);
const User = model("user", userSchema);
module.exports = {
  User,
};
