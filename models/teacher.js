const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    // Class teacher @class
    classteacher: { type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "Class" },
    
    // HOD @department
    hod: { type: mongoose.Schema.Types.ObjectId, required: false, default: null, ref: "Department" },
    
    // User
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model('Teacher', schema);