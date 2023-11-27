const express = require("express");
const getNews = require("../../controllers/news/getNews");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();
router.get("/", wrapper(getNews));
module.exports = router;
