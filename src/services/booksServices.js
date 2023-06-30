const { Book } = require('../models');

const getAll = async owner => {
  const books = await Book.find({ owner }).populate('owner', 'name email');
  return books;
};

const getById = async (id, owner) => {
  return await Book.findOne({ _id: id, owner });
};

const addBook = async (newBook, owner) => {
  return await Book.create({ ...newBook, owner: owner });
};

const updateStatus = async (id, owner, status) => {
  return await Book.findByIdAndUpdate(
    { _id: id, owner },
    { $set: { status } },
    { new: true }
  );
};

const updateResume = async (bookId, owner, { resume, rating }) => {
  return await Book.findByIdAndUpdate(
    { _id: bookId, owner },
    { $set: { resume, rating } }
  );
};

const editBook = async (contactId, owner, bookData) => {
  const book = await Book.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: bookData }
  );
  return book;
};

const removeBook = async (bookId, owner) => {
  await Book.findByIdAndRemove({ _id: bookId, owner });
};

module.exports = {
  getAll,
  getById,
  addBook,
  updateStatus,
  updateResume,
  editBook,
  removeBook,
};
