const Notice = require("../../models/notice");

const { ageNotice } = require("../../helpers");

const listMyNotices = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const { _id: owner } = req.user;
  const skip = (page - 1) * limit;

  let notices = await Notice.find(
    { $and: [{ owner }, { title: { $regex: query, $options: "i" } }] },
    "",
    {
      limit,
      skip,
    }
  );

  if (age) {
    notices = notices.filter((notice) => ageNotice(notice, age));
  }

  if (sex) {
    notices = notices.filter((notice) => notice.sex === sex);
  }
  const totalCount = await Notice.countDocuments({
    title: { $regex: query, $options: "i" },
  });
  res.json({ notices, totalCount });
};

module.exports = listMyNotices;
