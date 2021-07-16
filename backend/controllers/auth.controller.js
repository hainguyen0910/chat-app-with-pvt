const jwt = require('jsonwebtoken');
const status = require('http-status');
const User = require('../models/User');

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(status.NOT_FOUND)
      .json({ message: 'user does not exist' });
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (!isMatch) {
      return res.status(status.UNAUTHORIZED).json({
        message: 'Password is not correct',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const { _id, username, fullname, sex, avatar, birthday, createdAt } = user;
    return res.json({
      _id,
      username,
      fullname,
      sex,
      avatar,
      birthday,
      createdAt,
      token
    });
  });
};

module.exports.register = async (req, res) => {
  const { username, password, fullname } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists !== null) {
    return res.status(status.BAD_REQUEST).json({
      message: 'User already exists!',
    });
  }

  try {
    const user = await User.create({
      username,
      password,
      fullname,
    });
    return res.json({ message: 'Registered successfully!' });
  } catch (err) {
    return res.status(status.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports.logout = (req, res) => {
  return res.json({ message: 'Logout successfully.' });
};
