const express = require('express');

// Models
const Marks = require('@models/marks');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/update', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body.marks
    };

    // Session
    console.log('Session started');
    const session = await Marks.startSession();
    session.startTransaction();


    // Run
    console.log(`Finding marks ${request.body.marks}`);
    Marks.findOneAndUpdate(query, {
        scores: request.body.scores
    }, { runValidators: true, new: true }, function (error, marks) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            new Response(response, 400, null, null);
        } else {
            session.commitTransaction();
            session.endSession();
            console.log('Session terminated');
            
            new Response(response, 200, null, marks);
        }
    });
});

module.exports.router = router;