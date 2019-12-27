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
    Marks.find(query, function (error, marks) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            new Response(response, 200, null, marks);
        }
    });
});

module.exports.router = router;