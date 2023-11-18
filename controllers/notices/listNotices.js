const Pet = require("../../models/notice");

const listNotices = async (req, res) => {
  // const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;

  const skip = (page - 1) * limit;
  // if (favorite && !["false", "true"].includes(favorite)) {
  //   throw HttpError(404, "Invalid filter falue");
  // }
  // const paramsObject = favorite ? { owner, favorite } : { owner };

  // res.json(await Pet.find(paramsObject, "", { skip, limit }));
  res.json(await Pet.find({}, "", { skip, limit }));
};

module.exports = listNotices;
