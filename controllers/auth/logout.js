const User = require("../../models/user");
const cntrlWrapper = require("../../helpers/controllerWrapper");

const logout = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { token: "" });
  res.json({
    message: "logout success",
  });
};

module.exports = {
  logout: cntrlWrapper(logout),
};
