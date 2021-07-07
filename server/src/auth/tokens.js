const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateAccessToken = (username) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2000h' });
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.status(401).json({ message: 'Invalid token' });
  jwt.verify(token, process.env.JWT_SECRET, async (err, userToken) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    const user = await User.findOne({ username: userToken.username });
    if (!user) {
      return res.status(401).json({ message: 'Username does not exist' });
    }
    req.user = user;
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
