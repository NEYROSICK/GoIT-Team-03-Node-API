const Notice = require("../../models/notice");

const { ageNotice } = require("../../helpers");

const listNotices = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const skip = (page - 1) * limit;

  let notices = await Notice.find({ title: { $regex: query } }, "", {
    limit,
    skip,
  });
  if (age) {
    notices = notices.filter((notice) => ageNotice(notice, age));
  }

  if (sex) {
    notices = notices.filter((notice) => notice.sex === sex);
  }
  res.json(notices);
};

module.exports = listNotices;
