const { trainingServices, booksServices } = require('../../services');
const { RequestError } = require('../../helpers');

const addResults = async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;

  const { date, pages } = body;

  const currentTraining = await trainingServices.getTraining(owner);

  if (!currentTraining) throw RequestError(404, 'Not found');

  const {
    _id,
    results,
    books: booksArr,
    startDate,
    completed,
    finishDate,
  } = currentTraining;

  if (completed) throw RequestError(403, 'Training is completed!');

  if (Date.parse(date) > finishDate) {
    await trainingServices.updateTraining(_id, owner, {
      completed: true,
      completenessReasonList: 'hasDeadlinePassed',
    });
  }

  //сторінок вже прочитано
  const totalPagesRead = results.reduce(
    (previousValue, result) => previousValue + result.pages,
    0
  );

  //кількість сторінок у прочитаних книгах
  const totalPagesInReadBooks = booksArr.reduce((previousValue, book) => {
    if (book.status === 'haveRead') {
      return previousValue + book.pages;
    }
    return previousValue;
  }, 0);

  let pagesReadCount = totalPagesRead - totalPagesInReadBooks + pages;

  for (const book of booksArr) {
    if (book.pages > pagesReadCount) {
      break;
    }
    if (book.status !== 'haveRead') {
      await booksServices.updateStatus(book._id, owner, 'haveRead');
      pagesReadCount = pagesReadCount - book.pages;
    }
  }

  const { books } = await trainingServices.getTraining(owner);

  const noUnreadBooks = books.every(({ status }) => status === 'haveRead');

  if (noUnreadBooks) {
    await trainingServices.updateTraining(_id, owner, {
      completed: true,
      completenessReason: 'noUnreadBooks',
    });
  }
  await trainingServices.addResults(_id, {
    date,
    pages,
  });
  const updatedTraining = await trainingServices.getTraining(owner);

  res.status(200).json(updatedTraining);
};

module.exports = addResults;
