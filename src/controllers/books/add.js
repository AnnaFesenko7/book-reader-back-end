const { booksServices } = require('../../services');

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const book = await booksServices.addBook({ ...req.body }, owner);
  res.status(201).json({ status: 'Success', code: 201, payload: { book } });
};
module.exports = add;
