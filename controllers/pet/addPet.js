const Pet = require("../../models/Pet");

const addPet = async (req, res, next) => {
  const result = await Pet.create(req.body);
  return res.status(201).json(result);
};

module.exports = addPet;
