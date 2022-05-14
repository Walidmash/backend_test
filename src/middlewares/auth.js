const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({ message: 'Access is denied!, Token required, please login to get a token' });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err)
        res.status(401).json({ message: 'Access is denied! Invalid Token..' });
      else {
        req.user = user;

        return next();
      }
    });
  }
};

module.exports = {
  auth
};
