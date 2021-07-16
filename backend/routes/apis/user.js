const express = require('express');
const router = express.Router();
const cloudinary = require('../../services/uploadService');

const upload = cloudinary('avatars', 'avatar');

const controller = require('../../controllers/user.controller');
const validator = require('../../middlewares/validators/user.validator');

router.post(
  '/update-profile',
  validator.updateProfile,
  upload.middleware,
  controller.updateProfile
);

router.post(
  '/change-password',
  validator.changePassword,
  controller.changePassword
);
// router.get('/:userId', controller.getUserById);

module.exports = router;
