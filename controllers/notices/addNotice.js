const Notice = require("../../models/notice");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { requestError } = require("../../helpers");
const convertAge = require("../../helpers/convertAge");
const avatarsDir = path.join(__dirname, "../", "../", "public", "noticesAvatars");

const addNotice = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const { date } = req.body;
  if (req.body.category === "sell" && !req.body.price) {
    throw requestError(404, "Missing field price");
  }
  if (req.body.category !== "sell" && req.body.price) {
    throw requestError(404, "You can't add price to this category");
  }

  const age = convertAge(date);

  const fileName = `${owner}_${nanoid()}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  await Jimp.read(resultUpload)
    .then((img) => {
      return img.resize(250, 250).quality(80).write(resultUpload);
    })
    .catch(() => {
      throw requestError(500, "File reading error");
    });

  const avatarURL = `https://goit-team-03-node.onrender.com/public/noticesAvatars/${fileName}`;

  const result = await Notice.create({ ...req.body, avatarURL, owner, age });
  return res.status(201).json(result);
};

module.exports = addNotice;
