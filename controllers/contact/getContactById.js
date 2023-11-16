const Contact = require("../../models/contact");
const requestError = require("../../helpers/requestError");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw requestError(404);
  }
  return res.status(200).json(result);
};

module.exports = getContactById;
