const express = require('express');

// Models
const User = require('@models/user');
const Teacher = require('@models/teacher');

// Globals
const Response = require('@globals/response');
const Config = require('@globals/config.json');

const router = express.Router();

router.post('/teacher/classteacher/update', function (request, response) {
    // Prepare
    const query = {
        _id: request.body.user,
        // Teacher
        role: Config.user.roles[1],
    };

    // Run
    // Find user
    User.findOne(query, function (error, user) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        } else {
            // Update teacher prototype
            const query = {
                _id: user._prototype
            };

            Teacher.findOneAndUpdate(query, { $set: { classteacher: request.body._class } },
                { runValidators: true, new: true }, function (error, teacher) {
                    if (error) {
                        console.error(error);
                        new Response(response, 400, null, null);
                    } else {
                        user._prototype = teacher;
                        new Response(response, 200, null, user);
                    }
                });
        }
    });
});

module.exports.router = router;