const { trainingServices } = require('../../services');

const completeness = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentTraining = await trainingServices.getTraining(owner);

  const { finishDate, completed, _id, books } = currentTraining;
  if (completed) {
    res.status(200).json({ status: 'success', code: 200, completed: true });
  }
  const now = new Date();
  const isUnreadBooks = books.some(book => book.status !== 'haveRead');
  const hasDeadlinePassed = finishDate - now < 0;

  if (!isUnreadBooks || hasDeadlinePassed) {
    await trainingServices.completeness(_id, owner, { completed: true });
    // res.status(200).json({ status: 'success', code: 200, completed: true });
  }
  // res.status(200).json({ status: 'success', code: 200, completed: false });
  next();
};

module.exports = completeness;
