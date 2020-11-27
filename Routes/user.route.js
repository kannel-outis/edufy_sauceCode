// jshint esversion: 6
// jshint esversion: 8

const express = require('express');
const { userIDGet, userIDPatch, userIDDelete, userIDUpdateMyCourses, userIDGetUserCourse } = require('../controllers/user.controller');
const { verifyToken } = require('../helpers/token_helper');

const router = express.Router();



router.route("/:userID")
    .get(verifyToken, userIDGet)
    .patch(verifyToken, userIDPatch)
    .delete(verifyToken, userIDDelete);
router.route("/:userID/my-courses")
    .patch(verifyToken, userIDUpdateMyCourses)
    .get(verifyToken, userIDGetUserCourse);









module.exports = router;