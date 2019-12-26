const express = require('express');

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', async function (request, response) {
    // Prepare
    const query = {
        department: request.body.department
    };

    // Session
    const session = await Class.startSession();
    session.startTransaction();

    // Run
    Class.find(query, function (error, list) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else {
            session.commitTransaction();
            session.endSession();
            
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;