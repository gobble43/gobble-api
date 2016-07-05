const fetch = require('isomorphic-fetch');
const gobbleDB = process.env.GOBBLE_DB_URL;
const { checkStatus, parseJSON, handleError } = require('./../lib/fetch-utils');
const { removeQuotes } = require('../lib/post-utils');

const routePostAPI = app => {
  app.get('/post/date', (req, res) => {
    const date = req.query.date ? `&date=${removeQuotes(req.query.date)}` : '';
    fetch(`${gobbleDB}/db/post/date${date}`)
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
    const date = req.query.date ? `&date=${removeQuotes(req.query.date)}` : '';
    fetch(`${gobbleDB}/db/post/friends?facebookId=${facebookId}${date}`)
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

  app.get('/post/parent', (req, res) => {
    const parentId = req.query.parentId;
    fetch(`${gobbleDB}/db/post/parent?parentId=${parentId}`)
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

  app.post('/post/comment', (req, res) => {
    const comment = req.body;
    fetch(`${gobbleDB}/db/post/comment`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    }).then(checkStatus)
      .then(parseJSON)
      .then(commentData => {
        console.log(commentData);
        res.status(200);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routePostAPI;
