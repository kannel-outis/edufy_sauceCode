// jshint esversion: 6
// jshint esversion: 8
// const express = require('express');
// const router = express.Router();
const createError = require('http-errors');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { AuthSchema, LoginAuthSchema } = require('../helpers/validation_Schema');
const { NewRegisteredToken, SignedRefreshToken, verifyRefreshToken } = require('../helpers/token_helper');




module.exports = {
    register: async (req, res, next) => {
        try {

            //validationResults constains the request body after validation 
            // which means it contains our proccessed email and password

            const validationResults = await AuthSchema.validateAsync(req.body);

            await User.find({ email: validationResults.email }).then(async function (results) {
                await bcrypt.hash(validationResults.password, 10).then(async function (hash) {
                    if (hash) {
                        if (results.length >= 1) throw createError.Conflict(`${validationResults.email} already exist`);
                        const user = new User({ first_name: validationResults.first_name, last_name: validationResults.last_name, email: validationResults.email, password: hash });

                        await user.save().then(async (userInformation) => {
                            const newToken = await NewRegisteredToken(userInformation.id);
                            const refreshToken = await SignedRefreshToken(userInformation.id);
                            res.status(200).json({
                                id: userInformation.id,
                                email: userInformation.email,
                                first_name: userInformation.first_name,
                                last_Name: userInformation.last_name,
                                tokens: {
                                    accessToken: newToken,
                                    refreshToken: refreshToken
                                }

                            });
                        });
                    }
                });



            });

        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    },
    login: async function (req, res, next) {
        try {
            const validationResults = await LoginAuthSchema.validateAsync(req.body);
            await User.findOne({ email: validationResults.email }).then(async function (foundUser) {
                if (!foundUser) throw createError.NotFound('User not registered');
                await bcrypt.compare(validationResults.password, foundUser.password).then(async function (result) {
                    if (!result) throw createError.Unauthorized('wrong email / password');
                    const newToken = await NewRegisteredToken(foundUser.id);
                    const refreshToken = await SignedRefreshToken(foundUser.id);
                    res.status(200).json({
                        id: foundUser.id,
                        email: foundUser.email,
                        first_name: foundUser.first_name,
                        last_Name: foundUser.last_name,
                        courses_enrolled: foundUser.courses_enrolled,
                        tokens: {
                            accessToken: newToken,
                            refreshToken: refreshToken
                        }
                    });

                });

            });
        } catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest("invalid email / password"));
            next(error);
        }
    },
    refreshToken: async function (req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw createError.BadRequest();
            // we need to extract the userId from the userId fromthe previous refreshToken
            // and use the userId to generate another accessToken and refreshToken
            const userId = await verifyRefreshToken(refreshToken);

            const accessToken = await NewRegisteredToken(userId);
            const refToken = await SignedRefreshToken(userId);

            res.send({ accessToken: accessToken, refreshToken: refToken });

        } catch (error) {
            next(error);
        }
    }

};