const connection = require('../database/db_connection.js');
const users = require('../helpers/users.js');

const getUser = (email, cb) => {
  const sql = {
    text: `SELECT users.id, users.email FROM users
            WHERE email = $1`,
    values: [email]
  };
  connection.query(sql, (err, res) => {
    cb(err,res.rows[0])
  });
}

const postUserRegister = (email, password, stripe_id, cb) => {
  const hashed = users.hashPassword(password);
  const sql = {
    text: `INSERT INTO users (email, password, stripe_id)
     VALUES ($1,$2,$3) RETURNING *`,
    values: [email, hashed, stripe_id]
  };
  connection.query(sql, (err, res) => {
    cb(err,res.rows[0])
  });
}

const userLogIn = (email, password, cb) => {
  const sql = {
    text: `SELECT * FROM users
            WHERE email = $1`,
    values: [email]
  };
  connection.query(sql, (error, res) => {
    if (error) {
      cb(error);
    } else {
      console.log(res.rows);
      if (res.rows.length === 0 || !users.comparePassword(password, res.rows[0].password))
        cb({ notMatched: true });
      else
        cb(null, res.rows[0]);
    }
  });
};

module.exports = {
  getUser,
  postUserRegister,
  userLogIn
};
