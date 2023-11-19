const Notice = require("../../models/notice");
const User = require("../../models/user");
const listMyAds = async (req, res) => {
  res.json({ ok: true });
};
module.exports = listMyAds;
