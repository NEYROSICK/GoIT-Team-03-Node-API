const Contact = require("../../models/contact");
const requestError = require("../../helpers/requestError");

const listContacts = async (req, res, next) => {
  const { page = 1, limit = 0, favorite } = req.query;
  const skip = Number(page) <= 1 ? 0 : (page - 1) * limit;
  const contactCount = await Contact.countDocuments();
  if (skip >= contactCount) {
    throw requestError(400, "Out of range request");
  }

  const query = { owner: req.user.id };

  if (favorite) {
    query.favorite = favorite;
  }

  const result = await Contact.find(query, null, { skip }).limit(limit);
  return res.status(200).json(result);
};

module.exports = listContacts;
