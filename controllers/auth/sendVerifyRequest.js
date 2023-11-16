const User = require("../../models/user");
const sendMail = require("../../helpers/sendMail");
const requestError = require("../../helpers/requestError");

const sendVerifyRequest = async (req, res, next) => {
  const { email } = req.body;
  const { verify, verificationToken } = await User.findOne({ email });

  if (verify) {
    throw requestError(400, "Verification has already been passed");
  }

  const verificationLink = `http://localhost:3000/api/users/verify/${verificationToken}`;

  await sendMail({
    to: email,
    subject: "Email verification",
    context: { verificationLink },
  }).catch((err) => console.error(err));

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = sendVerifyRequest;
