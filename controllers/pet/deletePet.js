const Pet = require("../../models/pet");
const path = require("path");
const fs = require("fs/promises");

const { requestError } = require("../../helpers");

const deletePet = async (req, res, next) => {
  const { petId } = req.params;

  const pet = await Pet.findById(petId);
  const avatarsDir = path.join(__dirname, "../", "../", "public", pet.avatarURL);
  fs.unlink(avatarsDir);

  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    throw requestError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = deletePet;
