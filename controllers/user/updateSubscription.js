const User = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  const { id } = req.user;

  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    select: "email subscription -_id",
  });

  res.status(200).json(result);
};

module.exports = updateSubscription;
