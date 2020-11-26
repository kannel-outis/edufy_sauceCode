// jshint esversion: 6
//jshint esversion: 8
const express = require('express');
const { verifyToken } = require('../helpers/token_helper');
const createError = require('http-errors');
const { CourseSchema } = require('../helpers/validation_Schema');
const dateTime = require('../helpers/date_time');
const Course = require('../models/course.model');
const User = require('../models/user.model');
const router = express.Router();



router.route("/courses").get(async function (req, res, next) {
    try {
        await Course.find({}).populate('instructors', '-password').exec((err, results) => {
            try {
                if (!err) {
                    res.status(200).send(results);
                    console.log(results);
                } else {
                    throw new Error(err);
                }
            } catch (error) {
                next(error);
            }
        });
    } catch (error) {
        next(error);
    }
})
    .post(verifyToken, async function (req, res, next) {
        const { duration } = req.body;
        try {
            console.log(dateTime.getDateTime());
            const validationResults = await CourseSchema.validateAsync(req.body);

            await User.findById(req.payload.userID).then(async (results) => {
                if (results) {
                    const course = new Course({
                        category: validationResults.category,
                        title: validationResults.title,
                        description: validationResults.description,
                        duration: duration,
                        // tutors here should be an array of valid userIDs cos people can have thesame names
                        // unless we want to add a username field
                        tutors: validationResults.tutors,
                        date_added: dateTime.getDateTime(),
                        added_by: results.email,
                    });
                    await course.save().then((documents) => { res.status(200).send(documents); });
                } else {
                    throw createError.Unauthorized('Something went wrong. user could not be found');
                }
            });
            console.log("passed");
        } catch (error) {
            next(error);
        }
    });


module.exports = router;