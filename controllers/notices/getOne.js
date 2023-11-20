const Notice = require("../../models/notice");

const { requestError } = require("../../helpers");

const getOne = async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findById(noticeId);
  if (!notice) {
    throw requestError(404, "Notice not found");
  }

  res.status(200).json(notice);
};

module.exports = getOne;
