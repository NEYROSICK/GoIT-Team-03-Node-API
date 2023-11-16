const fs = require("fs/promises");
const path = require("path");
const requestError = require("../../helpers/requestError");
const User = require("../../models/user");
const jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const { filename } = req.file;
  const tmpPath = path.join(__dirname, `../../tmp/${filename}`);
  const publicPath = path.join(__dirname, `../../public/avatars/${filename}`);

  try {
    const avatar = await jimp.read(tmpPath);
    await avatar.resize(250, 250).writeAsync(tmpPath);
    await fs.rename(tmpPath, publicPath);
  } catch (error) {
    await fs.unlink(tmpPath);
    throw requestError(500, "Internal Server Error");
  }

  const id = req.user.id;
  const user = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: `/public/avatars/${filename}`,
    },
    { new: true }
  );

  res.status(200).json({ avatarURL: user.avatarURL });
};

module.exports = updateAvatar;
