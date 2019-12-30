const mongoose = require('mongoose');

// Models
const Config = require('@globals/config.json');

// Patterns
const { __time } = require('@globals/patterns');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    day: {
        type: String,
        enum: Config.timetable.days,
        required: true
    },

    time: {
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
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    }
    
});

module.exports = mongoose.model('Period', schema);