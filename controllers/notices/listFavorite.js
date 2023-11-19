const Notice = require("../../models/notice");
const User = require("../../models/user");
const listFavorite = async (req, res) => {
  res.json({ ok: true });
};
module.exports = listFavorite;
