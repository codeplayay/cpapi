const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Notice = require('@models/notice');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/post', async function (request, response) {
    // Session
    console.log('Session started');
    const session = await Notice.startSession();
    session.startTransaction();

    // Prepare notice
    const notice = new Notice({
        _id: new ObjectId(),
        subject: request.body.subject,
        body: request.body.body
    });

    // Run
    console.log('Posting notice');
    Notice(notice).save().then((notice) => {
        console.log('Notice posted');

        session.commitTransaction();
        session.endSession();
        console.log('Session terminated');

        new Response(response, 200, null, notice);
    }).catch((error) => {
        console.error(error);

        session.abortTransaction();
        session.endSession();
        console.log('Session aborted');

        new Response(response, 400, null, null);
    });
});

module.exports.router = router;