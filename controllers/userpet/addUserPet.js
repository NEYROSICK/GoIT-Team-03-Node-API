const UserPet = require("../../models/UserPet");

const addUserPet = async (req, res, next) => {
  const result = await UserPet.create(req.body);
  return res.status(201).json(result);
};

module.exports = addUserPet;
