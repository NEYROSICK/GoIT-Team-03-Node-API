const Notice = require("../../models/notice");
const User = require("../../models/user");
const { ageNotice } = require("../../helpers");

const listFavorite = async (req, res) => {
  const { _id } = req.user;
  const { query = "", age, sex, page, limit } = req.query;
  const skip = (page - 1) * limit;
  const user = await User.findById(_id);
  let notices = await Notice.find(
    {
      $and: [
        { _id: { $in: user.favoritesArr } },
        { title: { $regex: query, $options: "i" } },
      ],
    },
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

  const totalCount = notices.length;
  
  res.json({ notices, totalCount });
};
module.exports = listFavorite;
