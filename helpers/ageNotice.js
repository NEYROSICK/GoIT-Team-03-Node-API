function ageNotice(notice, age) {
  const today = new Date();

  const noticeDate = new Date(notice.date.split("-").reverse().join("-"));

  const ageDifference = today.getFullYear() - noticeDate.getFullYear();

  if (age === "to-1" && ageDifference < 1) {
    return notice;
  }

  if (age === "to-2" && ageDifference < 2) {
    return notice;
  }

  if (age === "from-2" && ageDifference >= 2) {
    return notice;
  }

  if (age === "to-1-from-2" && (ageDifference < 1 || ageDifference >= 2)) {
    return notice;
  }

  return null;
}
module.exports = ageNotice;
