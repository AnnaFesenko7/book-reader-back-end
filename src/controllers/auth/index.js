const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const googleRedirect = require('./googleRedirect');
const googleAuth = require('./googleAuth');
const { ctrlWrapper } = require('../../middlewares');

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
};
