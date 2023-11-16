const Contact = require("../../models/contact");
const requestError = require("../../helpers/requestError");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw requestError(404);
  }
  return res.status(200).json(result);
};

module.exports = removeContact;
