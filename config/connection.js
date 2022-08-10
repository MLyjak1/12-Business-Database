const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  'library_db',
  process.env.USER_NAME,
  process.env.PW,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  }
);

module.exports = sequelize;
