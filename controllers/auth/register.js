const User = require("../../models/user");
const bcryptjs = require("bcrypt");
const cntrlWrapper = require("../../helpers/controllerWrapper");
const  requestError  = require("../../helpers/requestError");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "this email is already in use");
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = {
  register: cntrlWrapper(register),
};
