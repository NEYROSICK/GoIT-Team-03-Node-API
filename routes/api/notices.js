const express = require("express");
const { validationMiddleware, uploadMiddleware, authenticate } = require("../../middleware");
const schema = require("../../schemas/notice");
const ctrlNotice = require("../../controllers/notices");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", wrapper(ctrlNotice.listNotices));
router.post(
  "/addNotice",
  authenticate,
  uploadMiddleware.single("image"),
  validationMiddleware(schema.addNotice),
  wrapper(ctrlNotice.addNotice)
);
router.delete("/deleteNotice/:noticeId", authenticate, wrapper(ctrlNotice.deleteNotice));
router.get("/favorite", authenticate, wrapper(ctrlNotice.listFavorite));
router.get("/in-good-hands", wrapper(ctrlNotice.listInGoodHands));
router.get("/sell", wrapper(ctrlNotice.listSell));
router.get("/lost-found", wrapper(ctrlNotice.listLostFound));
router.get("/getOne/:noticeId", wrapper(ctrlNotice.getOne));

module.exports = router;
