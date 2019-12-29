const mongoose = require('mongoose');

// Patterns
const { __text } = require('@globals/patterns');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    subject: {
        type: String,
        required: true,
        trim: true,
        match: __text
    },

    body: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notice', schema);