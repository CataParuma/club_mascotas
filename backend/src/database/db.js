const mysql = require("mysql");
const config = require("./config").config;

const { dbHost, dbUser, dbPort, dbPassword, dbName } = config;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the DB");
    return;
  }
  console.error("Connected to the MySQL database");
});

module.exports = db;
