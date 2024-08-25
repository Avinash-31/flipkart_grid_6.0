const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');
  
  const token = authHeader.replace('Bearer ', '');
  console.log('token : ',token);
  if (!token) return res.status(401).send('Access denied. Invalid token format.');

  try {
    const decoded = jwt.verify(token, 'avinash31803');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

module.exports = auth;