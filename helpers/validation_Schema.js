// jshint esversion: 6
const joi = require('@hapi/joi');


const AuthSchema = joi.object({
    email: joi.string().email().required().lowercase(),
    password: joi.string().min(5).required()
});



module.exports = { AuthSchema };