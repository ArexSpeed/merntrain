const PORT = 8000;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//get all payment
app.get('/payments', (req, res) => {
  const keyspace = 'app';
  const collection = 'payments';
  const url = `https://databaseurl.com/api/rest/v2/namespace/${keyspace}/collection/${collection}?page-size=20`;
  const token = 'AstraCS:tokencodestring';
  
  const options = {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'X-Cassandra-Token': token
    }
  }
  fetch(url, options)
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(err => console.log('error'))
} )

//get one account
app.get('/accounts/:id', (req, res) => {
  const keyspace = 'app';
  const collection = 'accounts';
  const url = `https://databaseurl.com/api/rest/v2/namespace/${keyspace}/collection/${collection}`;
  const token = process.env.TOKEN || 'AstraCS:tokencodestring';
  const id = req.params.id;

  const options = {
    method: "GET",
    headers: {
      Accept: 'application/json',
      'X-Cassandra-Token': token
    }
  }
  fetch(`${url}/${id}`, options)
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(err => console.log('error' + err))
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found');
  next(error);
};

function errorHandler(error, req, res) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  })
};

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))