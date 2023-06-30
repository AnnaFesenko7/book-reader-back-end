// const { Book } = require('../../models');
const { booksServices } = require('../../services');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  // const books = await Book.find({ owner }).populate('owner', 'name email');
  const books = await booksServices.getAll(owner);
  res.status(200).json({ status: 'success', code: 200, payload: { books } });
};
module.exports = getAll;
