const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create', async function (request, response) {

    // Session
    console.log('Session started');
    const session = await Department.startSession();
    session.startTransaction();

    // Prepare
    const department = new Department({
        _id: new ObjectId(),
        name: request.body.name
    });

    // Run
    console.log(`Creating department ${request.body.name}`);
    Department(department).save().then((department) => {
        console.log('Department created');

        session.commitTransaction();
        session.endSession();
        console.log('Session terminated');

        new Response(response, 200, null, department);
    }).catch((error) => {
        console.error(error);

        session.abortTransaction();
        session.endSession();
        console.log('Session aborted');

        new Response(response, 400, null, null);
    });
});

module.exports.router = router;