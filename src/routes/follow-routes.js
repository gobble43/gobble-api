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

  app.get('/is_following', (req, res) => {
    const followerId = req.query.follower_id;
    const followedId = req.query.followed_id;
    fetch(`${gobbleDB}/db/is_following?follower_id=${followerId}&followed_id=${followedId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(isFollowing => {
        console.log(`User ${followerId} is following ${followedId}: ${isFollowing}`);
        res.status(200).json(isFollowing);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.get('/following', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/following?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(followingData => {
        console.log(followingData);
        res.status(200).json(followingData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.get('/following_ids', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/following_ids?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(followingIdsData => {
        console.log(followingIdsData);
        res.status(200).json(followingIdsData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.get('/followers', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/followers?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(followersData => {
        console.log(followersData);
        res.status(200).json(followersData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });

  app.get('/follower_ids', (req, res) => {
    const facebookId = req.query.facebook_id;
    fetch(`${gobbleDB}/db/follower_ids?facebook_id=${facebookId}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(followerIdsData => {
        console.log(followerIdsData);
        res.status(200).json(followerIdsData);
      })
      .catch(err => {
        handleError(err);
        res.sendStatus(err.res.status);
      });
  });
};

module.exports = routeFollowAPI;
