'use strict';

const { sequelizeDB } = require('./src/models');
const { start } = require('./src/server');

sequelizeDB.sync()
  .then(() => {
    console.log('Sucessful connection');
    start();
  })
  .catch(e => console.error(e));