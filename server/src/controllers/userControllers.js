const User = require('../models/userModel');

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const sameUsernameUser = await User.findOne({ username });

  // Cannot have multiple users with the same username
  if (sameUsernameUser !== null) {
    return res.status(400).json({ message: 'Username is taken' });
  }
  const newUser = new User({ username, password });
  await newUser.save();
  res.status(201).send();
};

module.exports = { createUser };
