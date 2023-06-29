const { Book } = require('../../models');
const { booksServices } = require('../../services');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const books = await Book.find({ owner }).populate('owner', 'name email');

  res.status(200).json({ status: 'success', code: 200, payload: { books } });
};
module.exports = getAll;
