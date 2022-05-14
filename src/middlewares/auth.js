const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(401).json({ message: 'Access is denied!, please login..' });
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err)
        res.status(401).json({ message: 'Access is denied!, please login..' });
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
