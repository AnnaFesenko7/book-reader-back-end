const { trainingServices, booksServices } = require('../../services');
const { RequestError, isYesterdayOrToday } = require('../../helpers');

const addResults = async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;

  const { date, pages } = body;
  console.log('pages', pages);

  const currentTraining = await trainingServices.getTraining(owner);
  console.log(
    '🚀 ~ file: addResults.js:12 ~ addResults ~ currentTraining:',
    currentTraining
  );
  const allBooks = await booksServices.getAll(owner);

  if (!currentTraining) throw RequestError(404, 'Not found');

  const {
    _id,
    results,
    books: booksIdArr,
    startDate,
    completed,
    finishDate,
  } = currentTraining;
  if (completed) throw RequestError(403, 'Training is completed!');

  const books = booksIdArr.reduce(
    (arr, bookId) => {
      console.log(bookId.toString());
      return [
        ...arr,
        allBooks.find(book => book._id.toString() === bookId.toString()),
      ];
    },

    []
  );

  // if (Date.parse(body.date) < Date.parse(startDate)) throw RequestError(400, 'Date may not precede training start date')
  if (Date.parse(date) > finishDate) {
    await trainingServices.updateStatus(_id, owner, { completed: true });
  }

  //загалом сторінок в тренуванні
  const totalPagesInTraining = books.reduce(
    (previousValue, book) => previousValue + book.pages,
    0
  );

  //сторінок вже прочитано
  const totalPagesRead = results.reduce(
    (previousValue, result) => previousValue + result.pages,
    0
  );
  console.log(
    '🚀 ~ file: addResults.js:34 ~ addResults ~ totalPagesRead:',
    totalPagesRead
  );
  //кількість сторінок у прочитаних книгах
  const totalPagesInReadBooks = books.reduce((previousValue, book) => {
    if (book.status === 'haveRead') {
      return previousValue + book.pages;
    }
    return previousValue;
  }, 0);

  let pagesReadCount = totalPagesRead - totalPagesInReadBooks + pages;

  for (const book of books) {
    if (book.pages > pagesReadCount) {
      console.log(
        '🚀 ~ file: addResults.js:58 ~ addResults ~ book.pages:',
        book.pages
      );

      break;
    }
    if (book.status !== 'haveRead') {
      await booksServices.updateStatus(book._id, owner, 'haveRead');

      pagesReadCount = pagesReadCount - book.pages;
      console.log(
        '🚀 ~ file: addResults.js:56 ~ addResults ~ pagesReadCount:',
        pagesReadCount
      );
    }
  }

  // await trainingServices.completeness(_id, owner, { completed: true });
  res.json(await trainingServices.addResults(_id, { date, pages }));
};

module.exports = addResults;
