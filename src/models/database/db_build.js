const fs = require('fs');

const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log(`tables created with result : ${res}`);
  }
});
