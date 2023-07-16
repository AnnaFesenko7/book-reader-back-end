const { Book } = require('../../models');
const { NotFound } = require('http-errors');

const updateRating = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const { resume, rating } = req.body;
  console.log('🚀 ~ file: updateRating.js:8 ~ updateRating ~ resume:', resume);

  const updatedBook = await Book.findByIdAndUpdate(
    { _id: id, owner },
    { resume, rating },
    { new: true }
  );
  if (!updatedBook) {
    throw NotFound(`Product with id ${id} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    payload: { updatedBook },
  });
};

module.exports = updateRating;
