const express = require('express');

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/update', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body._id
    };

    // Session
    const session = await Class.startSession();
    session.startTransaction();

    // Run
    Class.findOneAndUpdate(query, {
        name: request.body.name
    }, { runValidators: true, new: true }, function (error, _class) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else {
            session.commitTransaction();
            session.endSession();
            
            new Response(response, 200, null, _class);
        }
    });
});

module.exports.router = router;