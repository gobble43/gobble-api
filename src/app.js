require('babel-polyfill');
require('isomorphic-fetch');

// Load environment variables
const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './env/production.env' });
}

const express = require('express');
const app = express();

require('./config/initialize')(app);
require('./routes/user-routes')(app);
require('./routes/post-routes')(app);
require('./routes/follow-routes')(app);
require('./routes/product-routes')(app);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.APP_NAME} is listening on port ${process.env.PORT}.`);
});

module.exports = app;
