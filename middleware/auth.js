const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { verifyToken };