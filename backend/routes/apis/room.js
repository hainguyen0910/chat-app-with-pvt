const express = require('express');
const router = express.Router();

const controller = require('../../controllers/room.controller');
// const validator = require('../../middlewares/validators/auth.validator');

router.get('/get', controller.get);
router.get('/:roomId', controller.getById);
router.post('/create', controller.create);
router.post('/join', controller.join);
router.get('/:roomId/leave', controller.leave);
router.post('/search', controller.search);

module.exports = router;