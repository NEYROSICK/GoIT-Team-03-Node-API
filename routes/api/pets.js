const express = require("express");
const { validationMiddleware, uploadMiddleware, authenticate } = require("../../middleware");
const schema = require("../../schemas/pet");
const ctrlPet = require("../../controllers/pet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", authenticate, wrapper(ctrlPet.listPets));
router.post(
  "/add",
  authenticate,
  uploadMiddleware.single("image"),
  validationMiddleware(schema.addPet),
  wrapper(ctrlPet.addPet)
);

router.delete("/delete/:petId", authenticate, wrapper(ctrlPet.deletePet));

module.exports = router;
