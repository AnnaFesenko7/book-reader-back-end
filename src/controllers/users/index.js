const getCurrent = require('./getCurrent');
const changeLang = require('./changeLang');
const changeTrainingStatus = require('./changeTrainingStatus');
const { ctrlWrapper } = require('../../middlewares');

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  changeLang: ctrlWrapper(changeLang),
  changeTrainingStatus: ctrlWrapper(changeTrainingStatus),
};
