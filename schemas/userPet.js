const joi = require("joi");

const addUserPet = joi.object({
  name: joi.string().required().messages({
    "any.required": "Name is required. Please provide the name of your pet.",
  }),
  date: joi.string().required().messages({
    "any.required": "Date is required. Please provide a date of birth of your pet.",
  }),
  type: joi.string().required().messages({
    "any.required": "Type is required. Please provide a type of your pet.",
  }),
  avatar: joi.string(),
  owner: joi.string(),
});

module.exports = {
  addUserPet,
};
