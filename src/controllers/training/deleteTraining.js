const { trainingServices } = require('../../services');

const deleteTraining = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(
    '🚀 ~ file: deleteTraining.js:5 ~ deleteTraining ~ owner:',
    owner
  );
  const { id } = req.params;

  await trainingServices.deleteTraining(id, owner);
  res.status(200).json({ status: 'Success' });
};

module.exports = deleteTraining;
