const express = require("express");
const validate = require("../../middleware/validationMiddleware");
const schema = require("../../schemas/userPet");
const ctrlPet = require("../../controllers/userpet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", wrapper(ctrlPet.listUserPets));
router.post("/", validate(schema.addUserPet), wrapper(ctrlPet.addUserPet));

module.exports = router;
