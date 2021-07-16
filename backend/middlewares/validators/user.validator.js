const Joi = require('@hapi/joi');
const status = require('http-status');

module.exports.updateProfile = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().min(5),
    sex: Joi.string().valid('male', 'female', 'unknown'),
    birthday: Joi.date()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.changePassword = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required().min(5),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
