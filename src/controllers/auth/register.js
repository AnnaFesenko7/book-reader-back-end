const bcrypt = require('bcrypt');

const { Conflict } = require('http-errors');
const { User } = require('../../models');

const register = async (req, res) => {
  console.log(req.body);
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const newUser = await User.create({ email, password: hashPassword, name });

  res.status(201).json({
    status: 'created',
    code: 201,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};
module.exports = register;
