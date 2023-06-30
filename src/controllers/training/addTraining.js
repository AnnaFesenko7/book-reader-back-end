const { trainingServices, booksServices } = require('../../services');
const { RequestError } = require('../../helpers');

const addTraining = async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;

  // const now = new Date();

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

  await trainingServices.addTraining(owner, body);

  // const currentTraining = await trainingServices.getTraining(owner);
  // res.status(201).json(currentTraining);
  res.status(201).json({ status: 'success', code: 201 });
  // if (currentTraining) {
  // const { finishDate, completed, _id } = currentTraining;
  // if (!completed) {
  // if (finishDate >= now) {
  //   const difference = finishDate - now;
  //   const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  //   throw RequestError(
  //     403,
  //     `Training is in progress. Try again in ${totalDays} days.`
  //   );
  // }
  //     res.status(201).json(currentTraining);
  //   } else {
  //     await trainingServices.deleteTraining(_id);
  //   }
  // }
};

module.exports = addTraining;
