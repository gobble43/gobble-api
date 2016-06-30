const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const gobbleDB = process.env.GOBBLE_DB_URL;

const routeUserAPI = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Gobble API.' });
  });

  app.get('/user', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/user?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(userData => {
        // console.log(userData);
        res.status(200).json(userData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.post('/user', (req, res) => {
    const newUser = {
      facebook_id: req.body.facebook_id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      display_name: req.body.display_name,
      gender: req.body.gender,
      photo_url: req.body.photo_url,
    };

    fetch(`${gobbleDB}/db/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    }).then(checkStatus)
      .then(parseJSON)
      .then(userData => {
        console.log(userData);
        res.status(200).send(userData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeUserAPI;
