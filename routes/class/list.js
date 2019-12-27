const express = require('express');

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', function (request, response) {
    // Prepare
    const query = {
        department: request.body.department
    };

    // Run
    Class.find(query, function (error, list) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;