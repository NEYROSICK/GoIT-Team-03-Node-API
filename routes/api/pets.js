const express = require("express");
const {
  validationMiddleware,
  uploadMiddleware,
  authenticate,
} = require("../../middleware");
const schema = require("../../schemas/pet");
const ctrlPet = require("../../controllers/pet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", wrapper(ctrlPet.listPets));
router.post(
  "/addPet",
  authenticate,
  uploadMiddleware.single("image"),
  validationMiddleware(schema.addPet),
  wrapper(ctrlPet.addPet)
);
router.delete("/deletePet/:petId", authenticate, wrapper(ctrlPet.deletePet));
router.patch("/favorite", authenticate, wrapper(ctrlPet.updateFavorite));

module.exports = router;
