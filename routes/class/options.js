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
        console.log(`Enlisting classes of department ${request.params.department}`);
        Class.find(query, function (error, list) {
            if (error) {
                console.error(error);

                console.log('Enlisting classes failed');
                new Response(response, 400, null, null);
            } else {
                var options = [];

                list.forEach(option => {
                    options.push({
                        _id: option._id,
                        label: option.name
                    })
                });

                console.log('Classes enlisted');
                new Response(response, 200, null, options);
            }
        });
    } else {
        console.log('Invalid ObjectId');
        new Response(response, 400, null, null);
    }
});

module.exports.router = router;