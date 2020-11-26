// jshint esversion: 6
const mongoose = require('mongoose');
const Course = require('../models/course.model');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    preferences: {
        type: Array,
        "default": []
    },
    courses_enrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

});

const User = mongoose.model('User', UserSchema);

module.exports = User;