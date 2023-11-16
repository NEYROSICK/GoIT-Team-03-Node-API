const express = require("express");
const validate = require("../../middleware/validationMiddleware");
const schema = require("../../schemas/pet");
const ctrlPet = require("../../controllers/pet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", wrapper(ctrlPet.listPets));
router.post("/", validate(schema.addPet), wrapper(ctrlPet.addPet));

module.exports = router;
