const { filterNotices } = require("../../helpers");

const listInGoodHands = async (req, res, next) => {
  const { query = "", age, sex, page, limit } = req.query;
  const category = "in-good-hands";

  const notices = await filterNotices(category, age, sex, page, limit, query);
  res.json(notices);
};

module.exports = listInGoodHands;
