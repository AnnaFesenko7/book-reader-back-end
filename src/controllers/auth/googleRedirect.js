const queryString = require('query-string');
require('dotenv').config();
const axios = require('axios');
const { User } = require('../../models');
const { tokenGeneration } = require('../../helpers');

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;
  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
  const { email, name, picture } = userData.data;
  let profile = await User.findOne({ email });

  if (!profile) {
    await User.create({
      name,
      email,
    });
    profile = await User.findOne({ email });
  }
  const payload = { id: profile._id };
  const token = tokenGeneration(payload);
  await User.findByIdAndUpdate(profile._id, { token });

  return res.redirect(
    `${process.env.FRONTEND_URL}/login/?token=${token}&name=${name}&avatar=${picture}`
  );
};
module.exports = googleRedirect;
