const User = require("../../models/user");
const bcryptjs = require("bcrypt");
const cntrlWrapper = require("../../helpers/controllerWrapper");
const  requestError  = require("../../helpers/requestError");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "email or password invalid");
  }
  const passwordCompare = await bcryptjs.compare(password, user.password);
  if (!passwordCompare) {
    throw requestError(401, "email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    name: user.name,
    email: user.email,
  });
};

module.exports = {
  login: cntrlWrapper(login),
};
