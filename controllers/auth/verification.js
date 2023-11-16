const requestError = require("../../helpers/requestError");
const User = require("../../models/user");

const verification = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );

  if (!user) {
    throw requestError(404, "User not found");
  }

  return res.status(200).json({ message: "Verification succesfull" });
};

module.exports = verification;
