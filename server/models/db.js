'use strict';
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Init sequelize with DB connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

// Add sequelize to db object
const db = {};
db.sequelize = sequelize;

// Load all models from models folder and save in db object
const files = fs.readdirSync(__dirname);
for (let file of files) {
  if (file !== 'db.js') {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

module.exports = db;