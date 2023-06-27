const { Book } = require('../../models');
const { NotFound } = require('http-errors');

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { status } = req.body;

  const updatedBook = await Book.findByIdAndUpdate(
    { _id: id, owner },
    { $set: { status } },
    { new: true }
  );

  if (!updatedBook) {
    throw NotFound(`Book with id ${id} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    payload: { updatedBook },
  });
};
module.exports = updateStatus;
