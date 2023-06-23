const { Book } = require('../../models');
const { NotFound } = require('http-errors');

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw NotFound(`Product with id ${id} not found`);
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateById;
