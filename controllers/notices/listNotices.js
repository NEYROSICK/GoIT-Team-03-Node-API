const Notice = require("../../models/notice");
const { requestError } = require("../../helpers");

const { ageNotice } = require("../../helpers");

const listNotices = async (req, res) => {
  const { query = "", category, age, sex, page, limit } = req.query;
  const skip = (page - 1) * limit;

  if (!category) {
    throw requestError(404, "Missing field category");
  }

  let notices = await Notice.find({ $and: [{ category }, { title: { $regex: query } }] }, "", {
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
