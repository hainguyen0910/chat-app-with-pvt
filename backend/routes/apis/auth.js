const express = require('express');
const router = express.Router();

const controller = require('../../controllers/auth.controller');
const validator = require('../../middlewares/validators/auth.validator');
const middleware = require('../../middlewares/auth.middleware');

router.post('/login', validator.login, controller.login);
router.post('/register', validator.register, controller.register);
router.post('/logout', middleware.requireAuth, controller.logout);

module.exports = router;