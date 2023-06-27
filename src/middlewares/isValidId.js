const { isValidObjectId } = require('mongoose');
const { BadRequest } = require('http-errors');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(BadRequest(`${id} is not valid id`));
  }
  next();
};
module.exports = isValidId;
