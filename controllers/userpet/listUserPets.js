const userPet = require("../../models/UserPet");

const listUserPets = async (req, res, next) => {
  const { _id: owner, name, email } = req.user;
  const pets = await userPet.find({ owner });
  return res.status(200).json({user: { name: name, email: email }, pets: {...pets}});
};

module.exports = listUserPets;
