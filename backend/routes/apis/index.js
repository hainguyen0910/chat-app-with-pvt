const express = require('express');
const middleware = require('../../middlewares/auth.middleware');
const router = express.Router();

const authRoute = require('./auth');
const roomRoute = require('./room');
const userRoute = require('./user');

router.use('/auth', authRoute);
router.use('/rooms', middleware.requireAuth, roomRoute);
router.use('/users', middleware.requireAuth, userRoute);

module.exports = router;
