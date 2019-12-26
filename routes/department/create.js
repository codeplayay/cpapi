const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create', async function (request, response) {
    // Prepare
    const department = new Department({
        _id: new ObjectId(),
        name: request.body.name
    });

    // Session
    const session = await Department.startSession();
    session.startTransaction();

    // Run
    Department(department).save().then((department) => {
        session.commitTransaction();
        session.endSession();

        new Response(response, 200, null, department);
    }).catch((error) => {
        console.error(error);

        session.abortTransaction();
        session.endSession();
        
        new Response(response, 400, null, null);
    });
});

module.exports.router = router;