const express = require('express');

// Models
const User = require('@models/user');

// Globals
const Response = require('@globals/response');
const Config = require('@globals/config');

const router = express.Router();

router.post('/teacher/autocomplete', function (request, response) {
    // Prepare
    query = {
        $text: { $search: request.body.query },
        role: Config.user.roles[1]
    };

    // Run
    User.find(query).limit(Config.user.autocomplete.limit).exec(function (error, result) {
        if (error) {
            console.error(error);
            new Response(response, 200, null, []);
        } else {
            new Response(response, 200, null, result);
        }
    });
});

module.exports.router = router;