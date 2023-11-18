const express = require("express");
const { validationMiddleware, uploadMiddleware, authenticate } = require("../../middleware");
const schema = require("../../schemas/userPet");
const ctrlPet = require("../../controllers/userpet");
const wrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", authenticate, wrapper(ctrlPet.listUserPets));
router.post(
  "/add",
  authenticate,
  uploadMiddleware.single("image"),
  validationMiddleware(schema.addUserPet),
  wrapper(ctrlPet.addUserPet)
);

router.delete("/delete/:petId", authenticate, wrapper(ctrlPet.deleteUserPet));

module.exports = router;
