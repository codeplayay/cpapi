const mongoose = require('mongoose');

// Patterns
const { __object_name, __code } = require('@globals/patterns');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true,
        trim: true,
        match: __object_name
    },

    code: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        match: __code
    },

    pattern: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        match: __code
    },

    global: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Subject', schema);