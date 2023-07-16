const { User } = require('../../models');

const changeTrainingStatus = async (req, res) => {
  const { _id } = req.user;

  const { isTrainingStarted } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    code: 200,
    isTrainingStarted,
  });
};
module.exports = changeTrainingStatus;
