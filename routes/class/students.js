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
    console.log(`Enlisting students of class ${request.body._class}`);
    Student.find(query).populate('user').exec(function (error, students) {
        if (error) {
            console.error(error);

            console.log('Enlisting students failed');
            new Response(response, 400, null, null);
        } else {

            console.log('Students enlisted');
            new Response(response, 200, null, students);
        }
    });
});

module.exports.router = router;