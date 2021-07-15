const express = require('express');
const router = express.Router();

const controller = require('../../controllers/room.controller');
// const validator = require('../../middlewares/validators/auth.validator');

router.get('/get', controller.get);
router.post('/create', controller.create);
router.post('/join', controller.join);
router.post('/search', controller.search);

module.exports = router;