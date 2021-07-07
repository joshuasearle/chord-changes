const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../auth/tokens');

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const sameUsernameUser = await User.findOne({ username });

  // Cannot have multiple users with the same username
  if (sameUsernameUser !== null) {
    return res.status(400).json({ message: 'Username is taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  const userToken = generateAccessToken(username);
  res.status(201).json({ token: userToken });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user === null) res.status(404).json({ message: 'User does not exist' });
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) res.status(400).json({ message: 'Incorrect password' });
  const userToken = generateAccessToken(username);
  res.status(200).json({ token: userToken });
};

module.exports = { createUser, loginUser };
