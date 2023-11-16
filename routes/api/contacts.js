const express = require("express");
const validate = require("../../middleware/validationMiddleware");
const schema = require("../../schemas/contact");
const ctrlContact = require("../../controllers/contact");
const wrapper = require("../../helpers/controllerWrapper");
const { authorization: auth } = require("../../middleware/authMiddleware");

const router = express.Router();
router.use(auth);

router.get("/", wrapper(ctrlContact.listContacts));

router.get("/:contactId", wrapper(ctrlContact.getContactById));

router.post("/", validate(schema.addContact), wrapper(ctrlContact.addContact));

router.delete("/:contactId", wrapper(ctrlContact.removeContact));

router.put("/:contactId", validate(schema.updateContact), wrapper(ctrlContact.updateContact));

router.patch(
  "/:contactId/favorite",
  validate(schema.updateFavorite),
  wrapper(ctrlContact.updateStatusContact)
);

module.exports = router;
