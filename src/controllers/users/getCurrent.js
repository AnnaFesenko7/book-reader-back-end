// const { Unauthorized } = require("http-errors");
// const { User } = require("../../models");
// const bcrypt = require("bcryptjs");

const getCurrent = async (req, res) => {
  // console.log(req.user);
  const { email, name, language, isTrainingStarted } = req.user;

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email,
      name,
      language,
      isTrainingStarted,
    },
  });
};
module.exports = getCurrent;
