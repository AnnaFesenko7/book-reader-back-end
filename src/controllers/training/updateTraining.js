const { trainingServices, booksServices } = require('../../services');
const { RequestError, isYesterdayOrToday } = require('../../helpers');

const updateTraining = async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;
  
  const { date, pages } = body.results[0];
  console.log('pages', pages);

  console.log(
    '🚀 ~ file: updateTraining.js:7 ~ updateTraining ~ body:',
    body.results[0].date
  );

  const currentTraining = await trainingServices.getTraining(owner);
  if (!currentTraining) throw RequestError(404, 'Not found');
  const { _id, results, books, startDate, completed, finishDate } =
    currentTraining;
  if (completed) throw RequestError(403, 'Training is completed!');

  // if (Date.parse(body.date) < Date.parse(startDate)) throw RequestError(400, 'Date may not precede training start date')
  // if (Date.parse(body.date) > Date.parse(finishDate)) throw RequestError(400, 'Date is greater than training finish date')
  // if (!isYesterdayOrToday(body.date)) throw RequestError(400, 'Date should be today or yesterday')

  //загалом сторінок в тренуванні
  const totalBooksPagesCount = books.reduce(
    (previousValue, book) => previousValue + book.pages,
    0
  );

  //сторінок вже прочитано
  const totalPagesReadCount = results.reduce(
    (previousValue, result) => previousValue + result.pages,
    0
  );
  //кількість сторінок у прочитаних книгах
  const totalReadBooksPagesCount = books.reduce((previousValue, book) => {
    if (book.status === 'haveRead') {
      return previousValue + book.pages;
    }
    return previousValue;
  }, 0);

  //   if (totalBooksPagesCount - totalPagesReadCount < Number(body.pages)) {
  //     const pagesRemained = totalBooksPagesCount - totalPagesReadCount;
  //     throw RequestError(
  //       400,
  //       `Provided pages count exceeds number of unread ${pagesRemained} pages!`
  //     );
  //   }
  if (totalPagesReadCount + Number(body.pages) >= totalBooksPagesCount) {
    for (const book of books) {
      const originalBook = await booksServices.getById({
        bookId: book._id,
        owner,
      });
      if (originalBook.status !== 'haveRead') {
        await booksServices.updateBookStatus(originalBook._id, owner, {
          status: 'haveRead',
        });
      }
    }
    res.json(
      await trainingServices.updateTraining(_id, {
        $push: { results: { ...body } },
        completed: true,
      })
    );
  } else {
    let pagesReadCount =
      totalPagesReadCount - totalReadBooksPagesCount + Number(body.pages);
    for (const book of books) {
      if (book.status === 'haveRead') continue;
      if (pagesReadCount >= book.pages) {
        await booksServices.updateBookStatus(book._id, owner, {
          status: 'haveRead',
        });
        pagesReadCount -= book.pages;
      } else break;
    }
    res.json(await trainingServices.addResults(_id, body));
  }
};

module.exports = updateTraining;
