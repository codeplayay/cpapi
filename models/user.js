const mongoose = require('mongoose');

// Patterns
const { __name } = require('@globals/patterns');

// Models
const Config = require('@globals/config.json');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    fname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: __name
    },

    mname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: __name
    },

    lname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: __name
    },

    uid: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: String,
        enum: [Config.user.roles.student.name, Config.user.roles.teacher.name],
        required: true
    },

    // Prototype is a keyword
    _prototype: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

// Indexes
schema.index({ '$**': 'text' });

module.exports = mongoose.model('User', schema);