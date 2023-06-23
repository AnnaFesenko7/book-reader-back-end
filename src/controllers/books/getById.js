const { Book } = require('../../models');
const { NotFound } = require('http-errors');

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findById(id);
  if (!result) {
    throw NotFound(`Book with id ${id} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getById;
