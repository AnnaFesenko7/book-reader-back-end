const { Schema, model } = require('mongoose');
const joi = require('joi');
const {
  // passwordRegexp,
  nameRegexp,
  emailRegExp,
} = require('../regularExpressions');

const usersRegisterSchema = joi.object({
  name: joi.string().min(3).max(100).trim().pattern(nameRegexp).required(),
  email: joi.string().min(10).max(63).pattern(emailRegExp).required(),
  password: joi.string().min(5).max(30).required(),
  repeat_password: joi.ref('password'),
});

const usersLoginSchema = joi.object({
  email: joi.string().min(10).max(63).pattern(emailRegExp).required(),
  password: joi.string().min(5).max(30).required(),
});

// * Schema
const userSchema = Schema(
  {
    name: {
      type: String,
      minlength: 2,
      match: nameRegexp,
    },
    password: {
      type: String,
      minlength: 5,
      // match: passwordRegexp,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegExp,
    },
    token: {
      type: String,
      default: null,
    },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: true,
    // },
    // newPassword: {
    //   type: String,
    //   default: '',
    // },
    // newPasswordToken: {
    //   type: String,
    //   default: '',
    // },
  },
  { versionKey: false, timestamps: true }
);

// * Model
const User = model('user', userSchema);

module.exports = { User, usersRegisterSchema, usersLoginSchema };
