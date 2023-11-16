const express = require("express");
const router = express.Router();
const ctrlAuth = require("../../controllers/auth");
const validate = require("../../middleware/validationMiddleware");
const user = require("../../schemas/user");
const { authorization: auth } = require("../../middleware/authMiddleware");
const ctrlUser = require("../../controllers/user");
const upload = require("../../middleware/uploadMiddleware");

router.post("/register", validate(user.authSchema), ctrlAuth.register);
router.post("/login", validate(user.authSchema), ctrlAuth.login);
router.post("/verify", validate(user.verificationSchema), ctrlAuth.sendVerifyRequest);
router.get("/verify/:verificationToken", ctrlAuth.verification);

router.post("/logout", auth, ctrlAuth.logout);
router.get("/current", auth, ctrlUser.getCurrentUser);
router.patch("/", validate(user.subSchema), auth, ctrlUser.updateSubscription);
router.patch("/avatars", auth, upload.single("image"), ctrlUser.updateAvatar);

module.exports = router;
