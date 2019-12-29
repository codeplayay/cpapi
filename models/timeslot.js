const mongoose = require('mongoose');

// Patterns
const { __time } = require('@globals/patterns');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    from: {
        type: String,
        required: true,
        trim: true,
        match: __time
    },

    to: {
        type: String,
        required: true,
        trim: true,
        match: __time
    }
    
});

module.exports = mongoose.model('TimeSlot', schema);