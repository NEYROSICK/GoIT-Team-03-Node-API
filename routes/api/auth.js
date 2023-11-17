const express = require("express");
const cntrl = require("../../controllers/auth/auth");
const validate = require("../../middleware/validationMiddleware");
const { schemas } = require("../../models/user");
const { authenticate } = require("../../middleware/authenticate");
const router = express.Router();

router.post("/register", validate(schemas.registerSchema), cntrl.register);
router.post("/login", validate(schemas.loginSchema), cntrl.login);

router.post("/logout", authenticate, cntrl.logout);

module.exports = router;
