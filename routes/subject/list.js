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
            Semester.findOne(query).populate('subjects').exec(function (error, subjects) {
                if(error) {
                    console.error(error);
                } else {
                    new Response(response, 200, null, subjects);
                }
            })
        }
    });
});

module.exports.router = router;