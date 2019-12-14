const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');
const Semester = require('@models/semester');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create', function (request, response) {

    // Prepare semester
    const semester = new Semester({
        _id: new ObjectId(),
        name: '1',
        marks: []
    });

    Semester(semester).save().then((semester) => {
        // Prepare
        const _class = new Class({
            _id: new ObjectId(),
            name: request.body.name,
            department: request.body.department,
            semester: semester._id
        });

        // Run
        Class(_class).save().then((_class) => {
            new Response(response, 200, null, _class);
        }).catch((error) => {
            console.error(error);
            new Response(response, 400, null, null);
        });
    });
});

module.exports.router = router;