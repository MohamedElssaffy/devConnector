const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  token = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = auth;
