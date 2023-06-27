const { Book } = require('../../models');

const add = async (req, res) => {
  const { _id } = req.user;

  const book = await Book.create({ ...req.body, owner: _id });

  res.status(201).json({ status: 'Success', code: 201, payload: { book } });
};
module.exports = add;
