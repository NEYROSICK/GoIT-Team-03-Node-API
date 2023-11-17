const express = require("express");
const cntrl = require("../../controllers/auth/index");
const { schemas } = require("../../schemas/user");
const { authenticate, validationMiddleware } = require("../../middleware");
const router = express.Router();

router.post("/register", validationMiddleware(schemas.registerSchema), cntrl.register);
router.post("/login", validationMiddleware(schemas.loginSchema), cntrl.login);

router.post("/logout", authenticate, cntrl.logout);

module.exports = router;
