// jshint esversion: 6
const joi = require('@hapi/joi');


const AuthSchema = joi.object({
    first_name: joi.string().min(2).required(),
    last_name: joi.string().min(2).required(),
    email: joi.string().email().required().lowercase(),
    password: joi.string().min(5).required()
});

const LoginAuthSchema = joi.object({
    email: joi.string().email().required().lowercase(),
    password: joi.string().min(5).required()
});

const CourseSchema = joi.object({
    category: joi.string().required(),
    title: joi.string().required(),
    duration: joi.string(),
    description: joi.string().required(),
    instructors: joi.array().required(),
    // date_added: joi.date().required(),
});



module.exports = { AuthSchema, LoginAuthSchema, CourseSchema };