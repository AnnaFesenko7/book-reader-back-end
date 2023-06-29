const { booksServices } = require('../../services');

const deleteBook = async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params;

  await booksServices.removeBook(id, owner);
  // await Book.findByIdAndRemove({ _id: id, owner });
  res.status(200).json({ status: 'Success' });
};
module.exports = deleteBook;
