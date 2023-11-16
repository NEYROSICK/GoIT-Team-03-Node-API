const User = require("../../models/user");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const sendMail = require("../../helpers/sendMail");

const register = async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  req.body.avatarURL = gravatar.url(req.body.email);
  req.body.verificationToken = nanoid();

  const user = await User.create(req.body);
  const verificationLink = `http://localhost:3000/api/users/verify/${user.verificationToken}`;
  await sendMail({
    to: user.email,
    subject: "Email verification",
    context: { verificationLink },
  }).catch((err) => console.error(err));

  const response = {
    user: { email: user.email, subscription: user.subscription },
  };
  return res.status(201).json(response);
};

module.exports = register;
