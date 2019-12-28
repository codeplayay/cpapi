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
    console.log(`Enlisting classes of department ${request.body.department}`);
    Class.find(query, function (error, list) {
        if (error) {
            console.error(error);

            console.log('Enlisting classes failed');
            new Response(response, 400, null, null);
        } else {
            console.log('Classes enlisted');
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;