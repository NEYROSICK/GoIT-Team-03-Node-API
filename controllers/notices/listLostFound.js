const { filterNotices } = require("../../helpers");

const listLostFound = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const category = "lost-found";

  const notices = await filterNotices(category, age, sex, page, limit, query);
  res.json(notices);
};

module.exports = listLostFound;
