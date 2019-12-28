const express = require('express');

// Models
const Teacher = require('@models/teacher');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/teacher/hod/get', function (request, response) {
    // Prepare
    const query = {
        hod: request.body.department,
    };

    // Run
    // Find user
    console.log(`Getting hod of department ${request.body.department}`);
    Teacher.findOne(query).populate('user').exec(function (error, teacher) {
        if (error) {
            console.error(error);

            console.log('Could not get hod');
            new Response(response, 400, null, null);
        } else {
            console.log('HOD found');
            if (teacher === null)
                new Response(response, 200, null, { _id: -1 });
            else
                new Response(response, 200, null, teacher);
        }
    });
});

module.exports.router = router;