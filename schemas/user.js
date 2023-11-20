const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string()
    .email()
    .message("Email should have a format like: email@email.com")
    .required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .message(
      "Invalid password format. Please make sure your password: is at least 6 characters long,  is at most 16 characters long, contains at least one digit, contains at least one lowercase letter, contains at least one uppercase letter."
    )
    .required(),
});
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .message("Email should have a format like: email@email.com")
    .required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .message(
      "Invalid password format. Please make sure your password: is at least 6 characters long, is at most 16 characters long, - contains at least one digit, contains at least one lowercase letter, contains at least one uppercase letter."
    )
    .required(),
});
const usersSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  email: Joi.string()
    .email()
    .message("Email should have a format like: email@email.com"),
  password: Joi.string()
    .min(6)
    .max(16)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
    .message(
      "Invalid password format. Please make sure your password: is at least 6 characters long, is at most 16 characters long, - contains at least one digit, contains at least one lowercase letter, contains at least one uppercase letter."
    )
    .required(),
  date: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .messages({
      "any.required": "Date is required. Please provide a date of your birth .",
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\+38\d{10}$/)
    .message("Please enter valid phone")
    .required(),
  city: Joi.string()
    .pattern(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/)
    .messages({
      "string.pattern.base": "Location must be in a valid city format",
      "any.required":
        "Location is required. Please provide a location in city format.",
    })
    .required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  usersSchema,
};

module.exports = {
  schemas,
};
