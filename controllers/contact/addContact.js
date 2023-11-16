const Contact = require("../../models/contact");

const addContact = async (req, res, next) => {
  req.body.owner = req.user.id;
  const result = await Contact.create(req.body);
  return res.status(201).json(result);
};

module.exports = addContact;
