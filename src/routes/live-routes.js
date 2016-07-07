const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const gobbleDB = process.env.GOBBLE_DB_URL;

const routeLiveAPI = (app) => {
  app.get('/live_all', (req, res) => {
    fetch(`${gobbleDB}/db/live_all`)
      .then(checkStatus)
      .then(parseJSON)
      .then(activeLivesData => {
        res.status(200).json(activeLivesData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.get('/live_list', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/live_list?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(liveListData => {
        res.status(200).json(liveListData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeLiveAPI;
