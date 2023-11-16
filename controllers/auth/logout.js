const User = require("../../models/user");

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { $unset: { token: 1 } });
  return res.status(204).json();
};

module.exports = logout;
