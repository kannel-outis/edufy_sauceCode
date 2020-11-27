// jshint esversion: 6
// jshint esversion: 8
const express = require('express');
const { register, login, refreshToken } = require('../controllers/auth.controller');


const router = express.Router();




router.post("/register", register);

router.post("/login", login);


// 
router.post("/refresh-token", refreshToken);







module.exports = router;