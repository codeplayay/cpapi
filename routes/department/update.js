const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/update', function (request, response) {
    // Prepare
    const query = {
        _id: request.body._id
    };

    // Run
    Department.findOneAndUpdate(query, {
        name: request.body.name
    }, { runValidators: true, new: true }, function (error, organisation) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            new Response(response, 200, null, organisation);
        }
    });
});

module.exports.router = router;