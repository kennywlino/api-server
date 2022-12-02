'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;
const animalRouter = require('./routes/animals');
const plantRouter = require('./routes/plants');

// setting up the server and middleware
const app = express();
app.use(cors());
app.use(express.json());

// using our routers-- modularized for better organization
app.use(animalRouter);
app.use(plantRouter);

// basic endpoint to ensure server is working
app.get('/', (req, res, next) => {
  res.status(200).send('Welcome...');
});

// using our custom made middleware to handle errors
app.use('*', notFound);
app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log('listening on port', PORT));
}

module.exports = { app, start };