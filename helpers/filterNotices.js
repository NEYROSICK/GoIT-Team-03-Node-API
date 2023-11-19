const Notice = require("../models/notice");

function ageNotice(notice, age) {
  const today = new Date();

  const noticeDate = new Date(notice.date);

  const ageDifference = today.getFullYear() - noticeDate.getFullYear();

  switch (age) {
    case "to-1":
      if (ageDifference < 1) {
        return notice;
      }
      break;
    case "to-2":
      if (ageDifference < 2) {
        return notice;
      }
      break;
    case "from-2":
      if (ageDifference > 2) {
        return notice;
      }
      break;
    case "to-1-from-2":
      if (ageDifference < 1 || ageDifference > 2) {
        return notice;
      }
      break;
    default:
      return null;
  }

  return null;
}

const filterNotices = async (category, query = "", age, sex) => {
  let notices = await Notice.find({
    $and: [{ category }, { title: { $regex: query } }],
  });

  if (age) {
    notices = notices.filter((notice) => ageNotice(notice, age));
  }

  if (sex) {
    notices = notices.filter((notice) => notice.sex === sex);
  }

  return notices;
};

module.exports = filterNotices;
