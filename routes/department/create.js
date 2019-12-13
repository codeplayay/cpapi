const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create', function (request, response) {
    // Prepare
    const department = new Department({
        _id: new ObjectId(),
        name: request.body.name
    });

    // Run
    Department(department).save().then((department) => {
        new Response(response, 200, null, department);
    }).catch((error) => {
        console.error(error);
        new Response(response, 400, null, null);
    });
});

module.exports.router = router;