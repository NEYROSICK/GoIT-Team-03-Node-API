const { filterNotices } = require("../../helpers");

const listInGoodHands = async (req, res, next) => {
  const { query = "", age, sex } = req.query;
  const category = "in-good-hands";

  const notices = await filterNotices(category, query, age, sex);
  res.json({ notices });
};

module.exports = listInGoodHands;
