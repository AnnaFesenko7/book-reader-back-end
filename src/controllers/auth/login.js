const { Unauthorized } = require('http-errors');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

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
  console.log(SECRET_KEY);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' });
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
