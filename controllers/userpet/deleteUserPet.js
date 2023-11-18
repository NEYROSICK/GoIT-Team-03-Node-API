const UserPet = require("../../models/UserPet");
const path = require("path");
const fs = require("fs/promises");

const { requestError } = require("../../helpers");

const deleteUserPet = async (req, res, next) => {
  const { petId } = req.params;

  const pet = await UserPet.findById(petId);
  const avatarsDir = path.join(__dirname, "../", "../", "public", pet.avatarURL);
  fs.unlink(avatarsDir);

  const result = await UserPet.findByIdAndRemove(petId);
  if (!result) {
    throw requestError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = deleteUserPet;
