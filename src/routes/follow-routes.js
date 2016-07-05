const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const gobbleDB = process.env.GOBBLE_DB_URL;

const routeFollowAPI = (app) => {
  app.post('/follow', (req, res) => {
    const newFollow = {
      follower: req.body.follower,
      followed: req.body.followed,
    };

    fetch(`${gobbleDB}/db/follow`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFollow)
    }).then(checkStatus)
      .then(parseJSON)
      .then(followData => {
        console.log(followData);
        res.status(200).send(followData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeFollowAPI;
