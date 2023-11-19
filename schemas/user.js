const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  email: Joi.string().email().required(),
 password: Joi.string().min(6).max(16).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).message("Please enter valid password").required(),
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
 password: Joi.string().min(6).max(16).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).message("Please enter valid password").required(),
});
const usersSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  email: Joi.string().email(),
 password: Joi.string().min(6).max(16).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/).message("Please enter valid password").required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  usersSchema,
};

module.exports = {
  schemas,
};
