const PORT = 8000;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

//get all payment

//get one account