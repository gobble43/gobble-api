const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const gobbleDB = process.env.GOBBLE_DB_URL;

const routeSearchAPI = (app) => {
  app.get('/search', (req, res) => {
    const query = req.query.q;
    fetch(`${gobbleDB}/db/search?q=${query}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(searchResultsData => {
        res.status(200).json(searchResultsData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeSearchAPI;
