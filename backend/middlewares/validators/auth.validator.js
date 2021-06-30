const Joi = require('@hapi/joi');
const status = require('http-status');

module.exports.login = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(5).insensitive(),
    password: Joi.string().required().min(5).insensitive(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.register = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(5).insensitive(),
    password: Joi.string().required().min(5).insensitive(),
    fullname: Joi.string().required().min(5),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
