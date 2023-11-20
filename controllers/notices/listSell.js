const { filterNotices } = require("../../helpers");

const listSell = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const category = "sell";

  const notices = await filterNotices(category, age, sex, page, limit, query);
  res.json(notices);
};

module.exports = listSell;
