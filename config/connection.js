const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host:'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

connection.connect(function(err, connection){
  if (err) throw err;
  return connection;
})

module.exports = connection;
