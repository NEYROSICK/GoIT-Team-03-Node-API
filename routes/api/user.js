const express = require("express");
const ctrl = require("../../controllers/user");
const { schemas } = require("../../schemas/user");
const { validationMiddleware, authenticate } = require("../../middleware");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.patch(
  "/:userId",
  validationMiddleware(schemas.usersSchema),
  ctrl.updateUser
);
router.patch("/favorite/:noticeId", authenticate, wrapper(ctrl.updateFavorite));

module.exports = router;
