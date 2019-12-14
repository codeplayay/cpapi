const mongoose = require('mongoose');

// Patterns
const { __object_name } = require('@globals/patterns');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
        trim: true,
        match: __object_name
    },

    total: {
        type: Number,
        required: true
    },

    passing: {
        type: Number,
        required: true
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },

    scores: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        },

        marks: {
            type: Number,
            required: false
        }
    }]
});

module.exports = mongoose.model('Marks', schema);