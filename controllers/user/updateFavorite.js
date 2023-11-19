const User = require("../../models/user");
const Notice = require("../../models/notice");

const updateFavorite = async (req, res) => {
  const { userId } = req.user;
  const { noticeId } = req.params;

  // await User.updateOne(userId, { $push: { favoritesArr: noticeId } });
  await Notice.findByIdAndUpdate(noticeId, {
    $push: { usersFavorite: userId },
  });

  res.status(200).json({ message: "Added to favorites successfully" });
};

module.exports = updateFavorite;
