const Pet = require("../../models/pet");
const { nanoid } = require("nanoid");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "../", "public", "petsAvatars");

const addPet = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(req.file);
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${owner}_${nanoid()}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  await Jimp.read(resultUpload)
    .then((img) => {
      return img.resize(250, 250).quality(80).write(resultUpload);
    })
    .catch((err) => {
      console.error(err);
    });

  const avatarURL = path.join(
    "https://goit-team-03-node.onrender.com",
    "public",
    "petsAvatars",
    fileName
  );

  const result = await Pet.create({ ...req.body, avatarURL, owner });

  return res.status(201).json(result);
};

module.exports = addPet;
