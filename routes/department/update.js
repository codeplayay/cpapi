const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/update', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body.department
    };

    // Session
    console.log('Session started');
    const session = await Department.startSession();
    session.startTransaction();

    // Run
    console.log(`Updating department ${request.body.department}`);
    Department.findOneAndUpdate(query, {
        name: request.body.name
    }, { runValidators: true, new: true }, function (error, organisation) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            new Response(response, 400, null, null);
        } else {
            console.log('Department udpated');

            session.commitTransaction();
            session.endSession();
            console.log('Session terminated');

            new Response(response, 200, null, organisation);
        }
    });
});

module.exports.router = router;