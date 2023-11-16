const joi = require("joi");

const addContact = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
  owner: joi.string(),
});

const updateContact = joi.object({
  name: joi.string(),
  email: joi.string(),
  phone: joi.string(),
  favorite: joi.boolean(),
});

const updateFavorite = joi.object({
  favorite: joi.boolean(),
});

module.exports = {
  addContact,
  updateContact,
  updateFavorite,
};
