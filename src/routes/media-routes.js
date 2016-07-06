const fetch = require('isomorphic-fetch');
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const gobbleDB = process.env.GOBBLE_DB_URL;

const routeMediaAPI = (app) => {
  // app.get('/', (req, res) => {
  //   res.status(200).json({ message: 'Welcome to the Gobble API.' });
  // });

  app.get('/user', (req, res) => {
    const postId = req.query.post_id;
    fetch(`${gobbleDB}/db/media?post_id=${postId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(media => {
        res.status(200).json(media);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeMediaAPI;
