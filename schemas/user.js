const joi = require("joi");

const authSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Email is required. Please provide a valid email address.",
      "string.email":
        "Invalid email format. Please provide a valid email address with at least two domain segments.",
    }),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      "any.required": "Password is required. Please provide a valid password",
      "string.pattern.base":
        "Password must be between 3 and 30 characters and contain only letters and numbers.",
    }),
});

const subSchema = joi.object({
  subscription: joi.string().valid("starter", "pro", "business").required().messages({
    "any.only": "Subscription must be either 'starter', 'pro', or 'business'.",
    "any.required": "Subscription is required.",
  }),
});

const verificationSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "Email is required. Please provide a valid email address.",
      "string.email":
        "Invalid email format. Please provide a valid email address with at least two domain segments.",
    }),
});

module.exports = { authSchema, subSchema, verificationSchema };
