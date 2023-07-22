const { RequestError } = require('../../helpers');
const { trainingServices } = require('../../services');

const getTraining = async (req, res) => {
  const { _id: owner } = req.user;
  const currentTraining = await trainingServices.getTraining(owner);

  if (!currentTraining) throw RequestError(404, 'Not found');

  const { finishDate, _id } = currentTraining;

  const now = Date.now();

  const hasDeadlinePassed = finishDate - now < 0;

  if (hasDeadlinePassed) {
    await trainingServices.completeness(_id, owner, {
      completed: true,
      completenessReasonList: 'hasDeadlinePassed',
    });
  }
  res.json(currentTraining);
};

module.exports = getTraining;
