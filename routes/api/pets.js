const express = require("express");
const { validationMiddleware, uploadMiddleware } = require("../../middleware");
const schema = require("../../schemas/pet");
const ctrlPet = require("../../controllers/pet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", wrapper(ctrlPet.listPets));
router.post("/addPet", uploadMiddleware.single("image"), validationMiddleware(schema.addPet), wrapper(ctrlPet.addPet));
router.delete("/deletePet/:petId", wrapper(ctrlPet.deletePet));

module.exports = router;
