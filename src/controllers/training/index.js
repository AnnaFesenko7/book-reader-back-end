const addTraining = require('./addTraining');
const getTraining = require('./getTraining');
const addResults = require('./addResults');
// const completeness = require('./completeness');
const deleteTraining = require('./deleteTraining');
const { ctrlWrapper } = require('../../middlewares');

module.exports = {
  addTraining: ctrlWrapper(addTraining),
  getTraining: ctrlWrapper(getTraining),
  addResults: ctrlWrapper(addResults),
  // completeness: ctrlWrapper(completeness),
  deleteTraining: ctrlWrapper(deleteTraining),
};
