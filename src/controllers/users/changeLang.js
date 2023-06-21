const { User } = require('../../models');

const changeLang = async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;

  const { language } = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    code: 200,
    language,
  });
};
module.exports = changeLang;
