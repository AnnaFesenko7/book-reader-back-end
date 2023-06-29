const { User } = require('../models');

const login = async (id, token) => {
  return await User.findByIdAndUpdate({ _id: id }, { token }, { new: true });
};

module.exports = {
  login,
};
