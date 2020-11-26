// jshint esversion: 6
// jshint esversion: 8

const express = require('express');
const createError = require('http-errors');
const User = require('../models/user.model');
const { verifyToken } = require('../helpers/token_helper');

const router = express.Router();



router.route("/:userID")
    .get(verifyToken, async function (req, res, next) {
        const { userID } = req.params;
        console.log(userID);
        try {
            await User.findById(userID).populate('courses_enrolled').exec((err, result) => {
                if (result) {
                    res.status(200).json(
                        {
                            id: result._id,
                            email: result.email,
                            first_name: result.first_name,
                            last_name: result.last_name,
                            preferences: result.preferences,
                            courses_enrolled: result.courses_enrolled,
                            __v: result.__v
                        }
                    );
                } else {
                    throw createError.NotFound('User Not found');
                }
            });
        } catch (error) {

            next(createError.NotFound(error.message));
        }
    })
    .patch(verifyToken, async function (req, res, next) {
        const { userID } = req.params;

        try {
            await User.findById(userID).then(async (result) => {
                const postBody = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    bio: req.body.bio,
                };
                if (result) {
                    if (req.payload.userID != result.id) throw createError.Forbidden('An Error Occurred');
                    await User.updateOne({ _id: result.id }, { $set: postBody }, { $push: { courses_enrolled: [...courses_enrolled] } }).then(async (success) => {
                        // courses_enrolled in the body here should be an array of valid courseIDs cos Courses can have thesame names
                        if (success) {
                            res.status(200).send(success);
                        } else {

                            throw createError.NotFound("Soumething went Wrong");
                        }
                    });
                } else {
                    throw createError.NotFound("User Not Found");
                }
            });
        } catch (error) {
            error.status = 422;
            next(error);

        }
    })
    .delete(verifyToken, async function (req, res, next) {
        const { userID } = req.params;

        try {
            await User.findById(userID).then(async (result) => {
                if (result) {
                    if (req.payload.userID === result.id) {
                        await User.deleteOne({ _id: userID }).then((success) => {
                            if (success) {
                                res.status(200).send(success);
                            }
                        });
                    } else {
                        throw createError.Forbidden('dont be a Scam');
                    }
                } else {
                    throw createError.NotFound('User Not found');
                }
            });
        } catch (error) {
            next(createError.Forbidden(error.message));
        }
    });

// router.get("/:userID/my-courses", verifyToken, async function (req, res, next) {
//     const { userID } = req.params;
//     console.log(userID);
//     try {
//         await User.findById(userID).then((result) => {
//             if (result) {
//                 res.status(200).json({ courses_enrolled: result.courses_enrolled });
//             }
//         });
//     } catch (error) {
//         next(createError.NotFound());
//     }
// });







module.exports = router;