const express = require('express');

// Models
const Marks = require('@models/marks');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/get', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body.marks
    };

    // Session
    const session = await Marks.startSession();
    session.startTransaction();

    // Run
    Marks.find(query, function (error, marks) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else {
            session.commitTransaction();
            session.endSession();
            
            new Response(response, 200, null, marks);
        }
    });
});

module.exports.router = router;