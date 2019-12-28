const express = require('express');

// Models
const Class = require('@models/class');
const Semester = require('@models/semester');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/list', function (_, response) {
    // Prepare
    let query = {};

    // Run
    Class.findOne(query, function (error, _class) {
        if (error) {
            console.error(error);

            new Response(response, 400, null, null);
        } else {
            // Prepare
            query = {
                _id: _class.semester
            };

            // Run
            console.log('Enlisting subjects');
            Semester.findOne(query).populate('subjects').exec(function (error, semester) {
                if (error) {
                    console.error(error);
                    console.log('Enlisting subjects failed');
                } else {
                    console.log('Subjects enlisted');
                    new Response(response, 200, null, semester.subjects);
                }
            })
        }
    });
});

module.exports.router = router;