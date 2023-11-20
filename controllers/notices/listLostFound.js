const { filterNotices } = require("../../helpers");

const listLostFound = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const category = "lost-found";

  const notices = await filterNotices(category, query, age, sex, page, limit);
  res.json({ notices });
};

module.exports = listLostFound;
