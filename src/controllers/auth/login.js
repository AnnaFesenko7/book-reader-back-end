const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { tokenGeneration } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;

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

  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};
module.exports = login;
