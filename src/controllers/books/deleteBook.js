const deleteBook = async (req, res) => {
  const { _id: owner } = req.user;
  const id = req.params;
  await Book.findByIdAndRemove({ _id: id, owner });
  res.status(204).json({ status: 'Success' });
};
module.exports = deleteBook;
