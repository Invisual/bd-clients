require('dotenv').config();
const mysql = require('mysql');
const connection = mysql.createConnection({
  multipleStatements: true,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  charset: "utf8_general_ci"
}); 
setInterval(function () {
  connection.query('SELECT 1');
}, 5000);
module.exports = connection;
