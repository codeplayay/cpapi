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
});

module.exports = mongoose.model('Department', schema);