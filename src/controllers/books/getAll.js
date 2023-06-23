const { Book } = require('../../models');

const getAll = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const result = await Book.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name email');
  // const result = await Product.find({}, "", { skip, limit: Number(limit) });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getAll;
