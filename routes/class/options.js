const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/options/:department', function (request, response) {
    if (ObjectId.isValid(request.params.department)) {
        // Prepare
        const query = {
            department: request.params.department
        };

        // Run
        Class.find(query, function (error, list) {
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
    } else {
        new Response(response, 200, null, []);
    }
});

module.exports.router = router;