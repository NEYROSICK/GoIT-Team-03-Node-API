const { filterNotices } = require("../../helpers");

const listSell = async (req, res) => {
  const { query = "", age, sex } = req.query;
  const category = "sell";

  const notices = await filterNotices(category, query, age, sex);
  res.json({ notices });
};

module.exports = listSell;
