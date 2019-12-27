const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', function (_, response) {
    // Prepare
    const query = {};

    // Run
    Department.find(query, function (error, list) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;