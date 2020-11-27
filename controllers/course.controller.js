// jshint esversion: 6
//jshint esversion: 8
const createError = require('http-errors');
const { CourseSchema } = require('../helpers/validation_Schema');
const dateTime = require('../helpers/date_time');
const Course = require('../models/course.model');
const User = require('../models/user.model');


module.exports = {
    getCourses: async function (req, res, next) {
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
    },
    addcourse: async function (req, res, next) {
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
                        instructors: validationResults.instructors,
                        date_added: dateTime.getDateTime(),
                        resources: validationResults.resources,
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
    },
    deleteAParticularCourse: async function (req, res, next) {
        const { courseID } = req.params;
        try {
            await Course.findByIdAndDelete(courseID).then((results) => {
                if (results) {
                    res.status(200).json(results);
                } else {
                    throw new Error('Something went wrong');
                }
            });
        } catch (error) {
            next(error);
        }
    },
    getAParticularCourse: async function (req, res, next) {
        const { courseID } = req.params;

        try {
            await Course.findById(courseID).populate('instructors', '-password').then((results) => {
                if (results) {
                    res.status(200).send(results);
                } else {

                    throw createError.NotFound('Course not found');
                }
            });
        } catch (error) {
            next(error);
        }
    }
};