const { Unauthorized } = require('http-errors');
const { User } = require('../models');
require('dotenv').config();
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const authenticate = async (req, _, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  try {
    if (bearer !== 'Bearer') {
      throw Unauthorized('Not auth');
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw Unauthorized('Not auth');
    }
    req.user = user;
    next();
  } catch (error) {
    next(Unauthorized('Not auth'));
  }
};

module.exports = authenticate;
