const Notice = require("../../models/notice");

const { ageNotice } = require("../../helpers");

const listMyNotices = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const { _id: owner } = req.user;
  const skip = (page - 1) * limit;

  let notices = await Notice.find({ $and: [{ owner }, { title: { $regex: query } }] }, "", {
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

module.exports = listMyNotices;
