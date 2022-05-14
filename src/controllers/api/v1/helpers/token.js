const jwt = require('jsonwebtoken');

function createToken(userID, email, stripe_id) {
  return jwt.sign({ userID, email, stripe_id }, process.env.TOKEN_SECRET);
}

module.exports = {
  createToken
};
