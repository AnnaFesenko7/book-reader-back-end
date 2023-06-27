const jwt = require('jsonwebtoken');
require('dotenv').config();

const { SECRET_KEY } = process.env;

const tokenGeneration = payload => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  return token;
};

// const tokenVerify = token => {
//   const { id } = jwt.verify(token, SECRET);
//   return id;
// };

module.exports = tokenGeneration;
