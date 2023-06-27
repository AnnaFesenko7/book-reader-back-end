const { Schema, model } = require('mongoose');
const {
  // passwordRegexp,
  nameRegexp,
  emailRegExp,
} = require('../regularExpressions');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
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
    language: {
      type: String,
      enum: ['ua', 'en'],
      default: 'en',
    },
    isTrainingStarted: {
      type: Boolean,
      default: false,
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

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
