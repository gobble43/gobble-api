const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const gobbleProductUrl = process.env.GOBBLE_PRODUCT_URL;

const routeProductAPI = (app) => {
  app.post('/product/getRecommendation', (req, res) => {
    const upc = req.body.upc;
    fetch(`${gobbleProductUrl}/api/getRecommendation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ upc })
    }).then(checkStatus)
      .then(parseJSON)
      .then(recommendation => {
        console.log(recommendation);
        res.status(200).send(recommendation);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeProductAPI;
