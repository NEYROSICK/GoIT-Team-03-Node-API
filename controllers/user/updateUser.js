const User = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { requestError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "usersAvatars");

const updateUser = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user && user.id !== userId.toString()) {
    return res.status(409).json({ message: "This email is already in use" });
  }

  const updateData = req.body;

  try {
    if (req.file) {
      const { path: tempUpload, originalname } = req.file;
      const fileName = `${userId}_${nanoid()}_${originalname}`;
      const resultUpload = path.join(avatarsDir, fileName);

      await fs.rename(tempUpload, resultUpload);

      await Jimp.read(resultUpload)
        .then((avatar) => {
          return avatar.resize(250, 250).quality(80).write(resultUpload);
        })
        .catch(() => {
          throw requestError(500, "File reading error");
        });

      const avatarURL = path.join(
        "https://goit-team-03-node.onrender.com",
        "public",
        "usersAvatars",
        fileName
      );

      updateData.avatarURL = avatarURL;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUser;
