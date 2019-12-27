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

    // Department to which class belongs
    department: mongoose.Schema.Types.ObjectId,

    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester'
    }
});

module.exports = mongoose.model('Class', schema);