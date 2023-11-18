const { Schema, model } = require("mongoose");

const handleMongooseModel = require("../helpers/handleMongooseModel");
function createUserModel() {
  const userSchema = new Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [16, 'Name can be at most 16 characters long'],
      validate: {
        validator: /^[a-zA-Z\s]+$/, 
        message: 'Name must contain only letters and spaces',
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: String,
    favoritesArr: [{ type: Schema.Types.ObjectId, ref: "pet" }],
  });

  userSchema.post("save", handleMongooseModel);

  const User = model("user", userSchema);
  return User;
}

const User = createUserModel();

module.exports = {
  User,
};