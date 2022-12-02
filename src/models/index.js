'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const animalsSchema = require('./animals.schema');
const plantsSchema = require('./plants.schema');
const ModelInterface = require('./modelInterface');

// tests with sqlite for testing; otherwise with DB @ DB_URL
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;

// instantiating the sequelize connection to the DB

const sequelizeDB = new Sequelize(DATABASE_URL);

// creating our animal model with the schema
const animalModel = animalsSchema(sequelizeDB, DataTypes);

// creating our plant model with the schema

const plantModel = plantsSchema(sequelizeDB, DataTypes);

module.exports = {
  sequelizeDB,
  animalInterface: new ModelInterface(animalModel),
  plantInterface: new ModelInterface(plantModel),
};
