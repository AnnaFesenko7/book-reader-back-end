const { trainingServices } = require('../../services');

const completeness = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentTraining = await trainingServices.getTraining(owner);
  console.log(
    '🚀 ~ file: completeness.js:7 ~ completeness ~ currentTraining:',
    currentTraining
  );

  const { finishDate, completed, _id, books } = currentTraining;
  if (completed) {
    res.status(200).json({ status: 'success', code: 200, completed: true });
  }
  const now = new Date();
  // const isUnreadBooks = books.some(book => {
  //   console.log('🚀 ~ file: completeness.js:17 ~ isUnreadBooks ~ book:', book);
  //   return book.status !== 'haveRead';
  // });
  const noUnreadBooks = books.every(({ status }) => status === 'haveRead');

  console.log(
    '🚀 ~ file: completeness.js:14 ~ completeness ~ isUnreadBooks:',
    noUnreadBooks
  );

  const hasDeadlinePassed = finishDate - now < 0;

  if (noUnreadBooks || hasDeadlinePassed) {
    await trainingServices.completeness(_id, owner, {
      completed: true,
      completenessReasonList: hasDeadlinePassed
        ? 'hasDeadlinePassed'
        : 'noUnreadBooks',
    });
  }
  // const updatedTraining = await trainingServices.getTraining(owner);

  // res
  //   .status(200)
  //   .json({ status: 'success', code: 200, payload: updatedTraining });
  next();
};

// module.exports = completeness;
