const { trainingServices, booksServices } = require('../../services');
const { RequestError } = require('../../helpers');

const addTraining = async (req, res) => {
  const { _id: owner } = req.user;

  const { body } = req;

  body.books.forEach(async id => {
    const originalBook = await booksServices.getById(id, owner);

    if (!originalBook) {
      throw RequestError(400, 'No books found by ids.');
    } else {
      if (originalBook.status === 'haveRead') {
        throw RequestError(400, 'Chosen books have already been read.');
      }
    }
    await booksServices.updateStatus(id, owner, 'reading');
  });

  const createdTraining = await trainingServices.addTraining(owner, body);

  res.status(201).json(createdTraining);
};

module.exports = addTraining;
