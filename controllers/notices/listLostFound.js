const Notice = require("../../models/notice");
const User = require("../../models/user");
const listLostFound = async (req, res) => {
  res.json({ ok: true });
};
module.exports = listLostFound;
