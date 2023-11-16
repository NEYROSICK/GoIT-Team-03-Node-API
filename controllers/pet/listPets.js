const Pet = require("../../models/Pet");

const listPets = async (req, res, next) => {
  const result = await Pet.find();
  return res.status(200).json(result);
};

module.exports = listPets;
