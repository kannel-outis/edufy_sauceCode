// jshint esversion: 6

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({

    category: {
        type: String
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    duration: {
        type: String,
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date_added: {
        type: Date
    },
    added_by: {
        type: String
    }

});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;