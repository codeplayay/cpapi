const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/options', function (_, response) {
    // Prepare
    const query = {};

    // Run
    Department.find(query, function (error, list) {
        if (error) {
            console.error(error);
            new Response(response, 200, null, []);
        } else {
            var options = [];

            list.forEach(option => {
                options.push({
                    _id: option._id,
                    label: option.name
                })
            });

            new Response(response, 200, null, options);
        }
    });
});

module.exports.router = router;