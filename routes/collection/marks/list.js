const express = require('express');

// Models
const Class = require('@models/class');
const Semester = require('@models/semester');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/list', function (request, response) {
    // Prepare
    const query = {
        _id: request.body._class
    };

    // Run
    Class.find(query).populate({
        path: 'semester',
        populate: {
            path: 'marks',
            select: 'name total passing subject',
            populate: {
                path: 'subject'
            }
        }
    }).exec(function (error, list) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;