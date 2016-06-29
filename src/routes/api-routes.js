const gobbleDB = process.env.GOBBLE_DB_URL;

const routeAPI = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Gobble API.' });
  });

  app.get('/user', (req, res) => {
    console.log(gobbleDB);
    res.status(200).json('GET user');
  });

  app.post('/user', (req, res) => {
    console.log(req.body);
    res.status(200).json('POST user to create a new user');
  });
};

module.exports = routeAPI;
