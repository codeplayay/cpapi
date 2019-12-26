const express = require('express');

// Models
const Student = require('@models/student');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/students', async function (request, response) {
    // Prepare
    const query = {
        _class: request.body._class
    };

    // Session
    const session = await Student.startSession();
    session.startTransaction();

    // Run
    Student.find(query).populate('user').exec(function (error, students) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else {
            session.commitTransaction();
            session.endSession();
            
            new Response(response, 200, null, students);
        }
    });
});

module.exports.router = router;