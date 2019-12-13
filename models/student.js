const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    // Class to which user belongs
    _class: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Class" },

    // Department to which user belongs
    department: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Department" },

    // User
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model('Student', schema);