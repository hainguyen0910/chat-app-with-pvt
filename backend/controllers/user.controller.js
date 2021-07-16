const status = require('http-status');
const User = require('../models/User');
const cloudinary = require('../services/uploadService');

const cloudinaryService = cloudinary('avatars', 'avatar');

module.exports.updateProfile = async (req, res) => {
  if (req.body.username) {
    return res.status(status.BAD_REQUEST).json({
      message: 'Can not update username',
    });
  }
  try {
    let user = await User.findById(req.userId);
    if (!user) {
      return res.status(status.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    let newData = { ...req.body };
    if (req.file) {
      newData.avatar = req.file.path;
    }
    cloudinaryService.removeFile(user.avatar);
    user.set({ ...newData });
    await user.save();

    user = await User.findById(user.id).select(
      'fullname username sex avatar birthday _id'
    );
    return res.json({ user });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(status.NOT_FOUND).json({
      message: 'User not found',
    });
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (!isMatch) {
      return res.status(status.BAD_REQUEST).json({
        message:
          'Sorry, your password is incorrect. Please check your password.',
      });
    }
    user.password = newPassword;
    user.save();

    const { _id, username, fullname, sex, avatar, birthday, createdAt } = user;
    return res.json({
      user: { _id, username, fullname, sex, avatar, birthday, createdAt },
    });
  });
};
