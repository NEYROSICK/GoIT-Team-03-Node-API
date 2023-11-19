const { filterNotices } = require("../../helpers");

const listLostFound = async (req, res) => {
  const { query = "", age, sex } = req.query;
  const category = "lost-found";

  const notices = await filterNotices(category, query, age, sex);
  res.json({ notices });
};

module.exports = listLostFound;
