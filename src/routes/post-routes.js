const fetch = require('isomorphic-fetch');
const gobbleDB = process.env.GOBBLE_DB_URL;
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const { removeQuotes } = require('./../lib/post-utils');

const routePostAPI = app => {
  app.get('/post/date', (req, res) => {
    const date = req.query.date;
    console.log(date, date[0]);
    fetch(`${gobbleDB}/db/post/date?date=${date}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.get('/post/friends', (req, res) => {
    const facebookId = req.query.facebookId;
    const date = removeQuotes(req.query.date);
    fetch(`${gobbleDB}/db/post/friends?facebookId=${facebookId}&date=${date}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: { facebookId }
    }).then(checkStatus)
      .then(parseJSON)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routePostAPI;
