const Notice = require("../../models/notice");
const { requestError } = require("../../helpers");

const { ageNotice } = require("../../helpers");

const listNotices = async (req, res) => {
  const { query = "", age, sex, page, limit } = req.query;
  const { category } = req.params;
  const skip = (page - 1) * limit;
  const acceptedCategories = ["sell", "in-good-hands", "lost-found"];

  if (!category) {
    throw requestError(404, "Missing field category");
  }

  if (!acceptedCategories.includes(category)) {
    throw requestError(404, "Category not found");
  }
  let notices = await Notice.find({ $and: [{ category }, { title: { $regex: query, $options: "i" } }] }, "", {
    limit,
    skip,
  });
  const totalCount = await Notice.countDocuments({
    title: { $regex: query, $options: "i" },
    category,
  });

  if (age) {
    notices = notices.filter((notice) => ageNotice(notice, age));
  }

  if (sex) {
    notices = notices.filter((notice) => notice.sex === sex);
  }

  res.json({ notices, totalCount });
};

module.exports = listNotices;
