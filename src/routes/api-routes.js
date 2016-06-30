const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON } = require('./../lib/fetch-utils');
const gobbleDB = process.env.GOBBLE_DB_URL;

const routeAPI = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Gobble API.' });
  });

  app.get('/user', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/user?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(userData => {
        console.log(userData);
        res.status(200).send(userData);
      })
      .catch(err => {
        console.error('GET /user failed:', err);
      });
  });

  app.post('/user', (req, res) => {
    
  });
};

module.exports = routeAPI;
