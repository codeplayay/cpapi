const express = require('express');

// Models 
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/list', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body._class
    };

    // Session
    const session = await Class.startSession();
    session.startTransaction();

    // Run
    Class.find(query).populate({
        path: 'semester',
        populate: {
            path: 'marks',
            select: 'name total passing subject',
            populate: {
                path: 'subject'
            }
        }
    }).exec(function (error, list) {
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