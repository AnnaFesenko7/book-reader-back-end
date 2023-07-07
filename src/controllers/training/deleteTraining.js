const { trainingServices } = require('../../services');

const deleteTraining = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.body;
  await trainingServices.deleteTraining(id, owner);
  res.status(200).json({ status: 'Success' });
};

module.exports = {
  deleteTraining,
};
