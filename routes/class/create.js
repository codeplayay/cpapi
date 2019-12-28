const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');
const Semester = require('@models/semester');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create', async function (request, response) {
    // Session
    console.log('Session started');
    const session = await Semester.startSession();
    session.startTransaction();

    // Prepare semester
    const semester = new Semester({
        _id: new ObjectId(),
        name: 'Untitled',
        marks: [],
        subjects: []
    });

    // Run
    console.log(`Creating default semester for class ${request.body.name}`);
    Semester(semester).save().then((semester) => {
        console.log('Default semester created');

        // Prepare
        const _class = new Class({
            _id: new ObjectId(),
            name: request.body.name,
            department: request.body.department,
            semester: semester._id
        });

        // Run
        console.log(`Creating class ${request.body.name}`);
        Class(_class).save().then((_class) => {
            console.log('Class created');

            session.commitTransaction();
            session.endSession();
            console.log('Session terminated');

            new Response(response, 200, null, _class);
        }).catch((error) => {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            new Response(response, 400, null, null);
        });
    }).catch((error) => {
        console.error(error);

        session.abortTransaction();
        session.endSession();
        console.log('Session aborted');

        new Response(response, 400, null, null);
    });
});

module.exports.router = router;