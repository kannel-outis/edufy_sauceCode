// jshint esversion: 6
//jshint esversion: 8
const express = require('express');
const { verifyToken } = require('../helpers/token_helper');
const { getCourses, addcourse, getAParticularCourse, deleteAParticularCourse } = require('../controllers/course.controller');
const router = express.Router();



router
    .route("/courses")
    .get(getCourses)
    .post(verifyToken, addcourse);
router
    .route('/courses/:courseID')
    .get(verifyToken, getAParticularCourse)
    .delete(verifyToken, deleteAParticularCourse);


// number off students enrolled
module.exports = router;





