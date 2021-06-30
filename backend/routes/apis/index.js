const express = require('express');
const router = express.Router();
const status = require('http-status');

// router.use('/:apiUrl',(req,res)=>{
//     const apiUrl = req.params;
//     if(!apiUrl)
//     return res.status(status.NOT_FOUND).json({message:'Api not found'})
// })

const authRoute = require('./auth');
router.use('/auth',authRoute);

module.exports = router;