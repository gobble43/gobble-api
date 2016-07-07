const fetch = require('isomorphic-fetch');
const gobbleRec = process.env.GOBBLE_REC_USER_URL;

const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');

const routeRecAPI = app => {
  app.get('/rec', (req, res) => {
    const facebookId = req.query.facebookId;
    fetch(`${gobbleRec}/rec/user?facebookId=${facebookId}`)
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
};

module.exports = routeRecAPI;
