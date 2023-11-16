const userPet = require("../../models/UserPet");

const listUserPets = async (req, res, next) => {
  const result = await userPet.find();
  return res.status(200).json(result);
};

module.exports = listUserPets;
