const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const {
  jwtSecret
} = require('../config/secret');

const {
  authenticate
} = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, jwtSecret, options)
}

function register(req, res) {
  // implement user registration
  user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json({
        err: "An error occurred while creating your account."
      })
    })

}

function login(req, res) {
  // implement user login
let { username, password } = req.body;
  
  Users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      console.log(token)
        res.status(200).json({
          message: `Welcome, ${user.username}! Have a token:`,token
        })
      } else {
        res.status(401).json({
          message: "An error occurred while logging in."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        err: "An error occurred while logging in."
      })
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: {
      accept: 'application/json'
    },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({
        message: 'Error Fetching Jokes',
        error: err
      });
    });
}