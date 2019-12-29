const express = require('express');

// Models
const Notice = require('@models/notice');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', function (request, response) {
    // Prepare
    const query = {
    };

    // Run
    console.log(`Enlisting notices`);
    Notice.find(query, function (error, list) {
        if (error) {
            console.error(error);

            console.log('Enlisting notices failed');
            new Response(response, 400, null, null);
        } else {
            console.log('Notices enlisted');
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;