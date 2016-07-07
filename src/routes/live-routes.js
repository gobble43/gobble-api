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

  app.post('/live', (req, res) => {
    const newLive = {
      facebook_id: req.body.facebook_id,
      active: req.body.active,
      peer_id: req.body.peer_id,
      views: req.body.views
    };

    fetch(`${gobbleDB}/db/live`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLive)
    }).then(checkStatus)
      .then(parseJSON)
      .then(liveData => {
        console.log(liveData);
        res.status(200).send(liveData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.post('/live_view', (req, res) => {
    const postedLive = {
      facebook_id: req.body.facebook_id,
      peer_id: req.body.peer_id,
    };

    fetch(`${gobbleDB}/db/live_view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postedLive)
    }).then(checkStatus)
      .then(status => {
        console.log(status);
        res.sendStatus(200);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeLiveAPI;
