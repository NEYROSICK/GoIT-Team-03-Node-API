const Pet = require("../../models/pet");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");

const avatarsDir = path.join(__dirname, "../", "../", "public", "petsAvatars");

const addPet = async (req, res, next) => {
  // const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const fileName = `${nanoid()}_${nanoid()}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  await Jimp.read(resultUpload)
    .then((img) => {
      return img.resize(250, 250).quality(80).write(resultUpload);
    })
    .catch((err) => {
      console.error(err);
    });

  const avatarURL = await path.join("petsAvatars", fileName);

  const result = await Pet.create({ ...req.body, avatarURL });

  return res.status(201).json(result);
};

// const add = async (req, res) => {
//   const { _id: owner } = req.user;

//   const result = await Contact.create({ ...req.body, owner });

//   res.status(201).json(result);
// };

module.exports = addPet;
