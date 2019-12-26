const express = require('express');

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', async function (_, response) {
    // Prepare
    const query = {
        _id: '5df390405a9e4c22ac3b70cf'
    };

    // Session
    const session = await Class.startSession();
    session.startTransaction();

    // Run
    Class.findOne(query).populate('subjects').exec(function (error, _class) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else {
            session.commitTransaction();
            session.endSession();
            
            new Response(response, 200, null, _class.subjects);
        }
    });
});

module.exports.router = router;