const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.error = 'Unauthorized: No token provided';
    return res.status(401).send(res.error);
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized: Invalid token');
    }

    res.locals.userId = JSON.stringify(decoded.userId);
    // console.log('verifyToken userId', res.locals.userId);
    return next();
  });
};

module.exports = verifyToken;
