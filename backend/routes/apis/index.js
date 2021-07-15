const express = require('express');
const middleware = require('../../middlewares/auth.middleware');
const router = express.Router();
// const status = require('http-status');

// router.use('/:apiUrl',(req,res)=>{
//     const apiUrl = req.params;
//     if(!apiUrl)
//     return res.status(status.NOT_FOUND).json({message:'Api not found'})
// })

const authRoute = require('./auth');
const roomRoute = require('./room');

router.use('/auth', authRoute);
router.use('/rooms', middleware.requireAuth, roomRoute);

module.exports = router;
