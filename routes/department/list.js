const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', async function (_, response) {
    // Prepare
    const query = {};

    // Session
    const session = await Department.startSession();
    session.startTransaction();

    // Run
    Department.find(query, function (error, list) {
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