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
module.exports = ageNotice;