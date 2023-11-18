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

module.exports = router;
