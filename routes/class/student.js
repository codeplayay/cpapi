const express = require('express');

// Models
const Student = require('@models/student');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/students', function (request, response) {
    // Prepare
    const query = {
        _class: request.body._class
    };

    // Run
    Student.find(query).populate('user').exec(function (error, students) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            new Response(response, 200, null, students);
        }
    });
});

module.exports.router = router;