const User = require("../../models/user");
const requestError = require("../../helpers/requestError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secret = process.env.secret;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email is wrong");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw requestError(401, "Password is wrong");
  }

  if (!user.verify) {
    throw requestError(401, "Email is not verified");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  await User.findOneAndUpdate({ email }, { token });

  const response = {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };

  return res.status(200).json(response);
};

module.exports = login;
