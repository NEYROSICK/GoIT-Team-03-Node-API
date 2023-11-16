const joi = require("joi");

const addPet = joi.object({
  title: joi.string().required().messages({
    "any.required": "Title is required. Please provide the Title for add.",
  }),
  name: joi.string().required().messages({
    "any.required": "Name is required. Please provide the name of your pet.",
  }),
  date: joi.string().required().messages({
    "any.required": "Date is required. Please provide a date of birth of your pet.",
  }),
  type: joi.string().required().messages({
    "any.required": "Type is required. Please provide a type of your pet.",
  }),
  sex: joi.string().valid("male", "female").required().messages({
    "any.only": "Sex must be either 'male', or 'female'.",
    "any.required": "Subscription is required.",
  }),
  location: joi.string().required().messages({
    "any.required": "Location is required. Please provide a location of your pet.",
  }),
  price: joi.string().required().messages({
    "any.required": "Price is required. Please provide a price of your pet.",
  }),
  comments: joi.string(),
  avatar: joi.string(),
  owner: joi.string(),
});

module.exports = {
  addPet,
};
