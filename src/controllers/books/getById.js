// const { Book } = require('../../models');
const { NotFound } = require('http-errors');
const { booksServices } = require('../../services');

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  // const book = await Book.findOne({ _id: id, owner });
  const book = await booksServices.getById(id, owner);
  if (!book) {
    throw NotFound(`Book with id ${id} not found`);
  }
  res.status(200).json({ status: 'success', code: 200, payload: { book } });
};
module.exports = getById;
