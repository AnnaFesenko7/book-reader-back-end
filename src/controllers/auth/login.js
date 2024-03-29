const { Unauthorized, BadRequest } = require('http-errors');
const { User } = require('../../models');
const { authServices } = require('../../services');
const bcrypt = require('bcrypt');
const { tokenGeneration } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest('Missing required field');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new Unauthorized(`Email ${email} not find`);
  }
  const passCompare = bcrypt.compareSync(password, user.password);

  if (!passCompare) {
    throw new Unauthorized(`Password wrong`);
  }
  const payload = {
    id: user._id,
  };
  const token = tokenGeneration(payload);

  const updatedUser = authServices.login(user._id, token);

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};
module.exports = login;
