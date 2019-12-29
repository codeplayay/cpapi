const express = require('express');

// Models
const Marks = require('@models/marks');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/get', function (request, response) {
    // Prepare
    const query = {
        _id: request.body.marks
    };

    // Run
    console.log(`Finding marks ${request.body.marks}`);
    Marks.find(query, function (error, marks) {
        if (error) {
            console.error(error);

            console.log('Finding marks failed');
            new Response(response, 400, null, null);
        } else {
            console.log('Marks found');
            new Response(response, 200, null, marks);
        }
    });
});

module.exports.router = router;