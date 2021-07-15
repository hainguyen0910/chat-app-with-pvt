const express = require('express');
const middleware = require('../../middlewares/auth.middleware');
const router = express.Router();

const authRoute = require('./auth');
const roomRoute = require('./room');

router.use('/auth', authRoute);
router.use('/rooms', middleware.requireAuth, roomRoute);

module.exports = router;
