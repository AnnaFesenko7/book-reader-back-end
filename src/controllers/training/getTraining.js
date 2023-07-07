const { RequestError } = require('../../helpers');
const { trainingServices } = require('../../services');

const getTraining = async (req, res) => {
  const { _id: owner } = req.user;
  const currentTraining = await trainingServices.getTraining(owner);
  console.log(
    '🚀 ~ file: getTraining.js:7 ~ getTraining ~ currentTraining:',
    currentTraining
  );
  if (!currentTraining) throw RequestError(404, 'Not found');
  res.json(currentTraining);
};

module.exports = getTraining;
