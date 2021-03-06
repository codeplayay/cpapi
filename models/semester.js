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

    marks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marks'
    }],

    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
});

module.exports = mongoose.model('Semester', schema);