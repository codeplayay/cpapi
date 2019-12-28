const express = require('express');

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/update', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body._class
    };

    // Session
    console.log('Session started');
    const session = await Class.startSession();
    session.startTransaction();

    // Run
    console.log(`Updating class ${request.body._class}`);
    Class.findOneAndUpdate(query, {
        name: request.body.name
    }, { runValidators: true, new: true }, function (error, _class) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            new Response(response, 400, null, null);
        } else {
            console.log('Class udpated');
            
            session.commitTransaction();
            session.endSession();
            console.log('Session terminated');

            new Response(response, 200, null, _class);
        }
    });
});

module.exports.router = router;