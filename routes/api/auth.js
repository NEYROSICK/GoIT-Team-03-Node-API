const express = require("express");
const cntrl = require("../../controllers/auth/index");
const validate = require("../../middleware/validationMiddleware");
const { schemas } = require("../../schemas/user");
const { authenticate } = require("../../middleware/authenticate");
const router = express.Router();

router.post("/register", validate(schemas.registerSchema), cntrl.register);
router.post("/login", validate(schemas.loginSchema), cntrl.login);

router.post("/logout", authenticate, cntrl.logout);

module.exports = router;
