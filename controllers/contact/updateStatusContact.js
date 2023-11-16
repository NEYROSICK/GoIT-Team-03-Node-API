const Contact = require("../../models/contact");
const requestError = require("../../helpers/requestError");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  if (!Object.keys(req.body).length) {
    throw requestError(400, "Missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw requestError(404);
  }

  return res.status(200).json(result);
};

module.exports = updateStatusContact;
