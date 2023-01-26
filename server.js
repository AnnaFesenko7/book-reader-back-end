const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST } = process.env;
const { PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connection successful on port ${PORT}`);
    })
  )
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
