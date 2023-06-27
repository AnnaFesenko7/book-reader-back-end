const addTraining = require('./addTraining');
const getTraining = require('./getTraining');
const updateTraining = require('./updateTraining');
const { ctrlWrapper } = require('../../middlewares');

module.exports = {
  addTraining,
  getTraining,
  updateTraining,
};
