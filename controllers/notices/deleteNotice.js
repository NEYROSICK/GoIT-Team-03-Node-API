const Notice = require("../../models/notice");
const path = require("path");
const fs = require("fs/promises");
const { requestError } = require("../../helpers");

const deleteNotice = async (req, res, next) => {
  const { noticeId } = req.params;
  const { _id: owner } = req.user;

  const notice = await Notice.findById(noticeId);

  if (notice.owner !== owner) {
    throw requestError(400, "This notice is not yours");
  }

  const avatarsDir = path.join(__dirname, "../", "../", "public", notice.avatarURL);
  fs.unlink(avatarsDir);

  const result = await Notice.findByIdAndRemove(noticeId);
  if (!result) {
    throw requestError(404);
  }

  return res.status(200).json(result);
};

module.exports = deleteNotice;
