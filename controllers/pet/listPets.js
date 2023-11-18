const Pet = require("../../models/pet");

const listPets = async (req, res, next) => {
  const { _id: owner, name, email } = req.user;
  const pets = await Pet.find({ owner });
  return res.status(200).json({ user: { name: name, email: email }, pets: { ...pets } });
};

module.exports = listPets;
