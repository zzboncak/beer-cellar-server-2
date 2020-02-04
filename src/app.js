require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const request = require('request');
const beersRouter = require('./beers/beers-router');
const usersRouter = require('./users/users-route');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/beers', beersRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/test', (req, res) => {

  let options = {
    'method': 'GET',
    'url': `https://api.untappd.com/v4/beer/info/2789250?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&oauth_consumer_key=${process.env.CLIENT_ID}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1579027479&oauth_nonce=xmUwT3Q1lCd&oauth_version=1.0&oauth_signature=W9Bzzn4PmqrOP43XnWmbMFZ1WC0=`,
    // 'headers': {
    // }
  };
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);
  });
  
});

// app.get('/beers', (req, res) => {
//   BeersService.getAllBeers(req.app.get('db'))
//     .then(response => res.send(response))
// });

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
})

module.exports = app;
