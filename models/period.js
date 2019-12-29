const mongoose = require('mongoose');

// Models
const Config = require('@globals/config.json');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    day: {
        type: String,
        enum: Config.timetable.days,
        required: true
    },

    time: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeSlot',
        required: true
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