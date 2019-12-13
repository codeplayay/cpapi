const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create', function (request, response) {
    // Prepare
    const _class = new Class({
        _id: new ObjectId(),
        name: request.body.name,
        department: request.body.department
    });

    // Run
    Class(_class).save().then((_class) => {
        new Response(response, 200, null, _class);
    }).catch((error) => {
        console.error(error);
        new Response(response, 400, null, null);
    });
});

module.exports.router = router;