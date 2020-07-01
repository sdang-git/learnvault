const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.error = 'Unauthorized: No token provided';
    return res.status(401).send(res.error);
  }

  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }

    req.email = decoded.email;
    return next();
  });
};

module.exports = verifyToken;
