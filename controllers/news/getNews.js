const News = require("../../models/news");
const getNews = async (req, res, next) => {
  const { query = "", page, limit } = req.query;
  const skip = (page - 1) * limit;
  const news = await News.find({ title: { $regex: query } }, "", {
    limit,
    skip,
  });
  res.json(news);
};
module.exports = getNews;
