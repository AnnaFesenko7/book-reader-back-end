const { booksServices } = require('../../services');

const deleteBook = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: bookId } = req.params;
  await booksServices.removeBook(bookId, owner);
  res.status(200).json({ status: 'Success' });
};
module.exports = deleteBook;
