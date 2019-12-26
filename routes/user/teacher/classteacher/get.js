const express = require('express');

// Models
const Teacher = require('@models/teacher');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/teacher/classteacher/get', async function (request, response) {
    // Prepare
    const query = {
        classteacher: request.body._class,
    };

    // Session
    const session = await Teacher.startSession();
    session.startTransaction();

    // Run
    // Find user
    Teacher.findOne(query).populate('user').exec(function (error, teacher) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else {
            console.log(teacher)
            if (teacher === null)
                new Response(response, 200, null, { _id: -1 });
            else {
                session.commitTransaction();
                session.endSession();
                
                new Response(response, 200, null, teacher);
            }
        }
    });
});

module.exports.router = router;