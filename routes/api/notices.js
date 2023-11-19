const express = require("express");
const { validationMiddleware, uploadMiddleware, authenticate } = require("../../middleware");
const schema = require("../../schemas/notice");
const ctrlPet = require("../../controllers/notices");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", wrapper(ctrlPet.listNotices));
router.post(
  "/addNotice",
  authenticate,
  uploadMiddleware.single("image"),
  validationMiddleware(schema.addNotice),
  wrapper(ctrlPet.addNotice)
);
router.delete("/deleteNotice/:noticeId", authenticate, wrapper(ctrlPet.deleteNotice));
router.get("/listFavorite", authenticate, wrapper(ctrlPet.listFavorite));
router.get("/listInGoodHands", authenticate, wrapper(ctrlPet.listInGoodHands));
router.get("/listSell", authenticate, wrapper(ctrlPet.listSell));
router.get("/listLostFound", authenticate, wrapper(ctrlPet.listLostFound));
router.get("/listMyAds", authenticate, wrapper(ctrlPet.listMyAds));

module.exports = router;
