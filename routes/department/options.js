const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/options', async function (_, response) {
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

            new Response(response, 200, null, []);
        } else {
            session.commitTransaction();
            session.endSession();
            
            var options = [];

            list.forEach(option => {
                options.push({
                    _id: option._id,
                    label: option.name
                })
            });

            new Response(response, 200, null, options);
        }
    });
});

module.exports.router = router;