const joi = require('joi');

const {
  // passwordRegexp,
  nameRegexp,
  emailRegExp,
} = require('../regularExpressions');

const registerSchema = joi.object({
  name: joi.string().min(3).max(100).trim().pattern(nameRegexp).required(),
  email: joi.string().min(10).max(63).pattern(emailRegExp).required(),
  password: joi.string().min(5).max(30).required(),
  confirmPassword: joi.ref('password'),
});

const loginSchema = joi.object({
  email: joi.string().min(10).max(63).pattern(emailRegExp).required(),
  password: joi.string().min(5).max(30).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
