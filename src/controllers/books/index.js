const getAll = require('./getAll');
const add = require('./add');
const getById = require('./getById');
const updateStatus = require('./updateStatus');
const deleteBook = require('./deleteBook');
const updateRating = require('./updateRating');
const { ctrlWrapper } = require('../../middlewares');

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getById: ctrlWrapper(getById),
  deleteBook: ctrlWrapper(deleteBook),
  updateStatus: ctrlWrapper(updateStatus),
  updateRating: ctrlWrapper(updateRating),
};
