const express = require('express');

// Models
const User = require('@models/user');
const Teacher = require('@models/teacher');

// Globals
const Response = require('@globals/response');
const Config = require('@globals/config.json');

const router = express.Router();

router.post('/teacher/classteacher/update', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body.user,
        // Teacher
        role: Config.user.roles.teacher.name,
    };

    // Session
    console.log('Session started');
    const session = await User.startSession();
    session.startTransaction();

    // Run
    // Find user
    console.log('Finding user');
    User.findOne(query, function (error, user) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            new Response(response, 400, null, null);
        } else {
            // Update teacher prototype
            const query = {
                _id: user._prototype
            };

            console.log('Updating prototypr');
            Teacher.findOneAndUpdate(query, { $set: { classteacher: request.body._class } },
                { runValidators: true, new: true }, function (error, teacher) {
                    if (error) {
                        console.error(error);

                        session.abortTransaction();
                        session.endSession();
                        console.log('Session aborted');

                        new Response(response, 400, null, null);
                    } else {
                        console.log('Class teacher updated');
                        user._prototype = teacher;

                        session.commitTransaction();
                        session.endSession();
                        console.log('Session terminated');
                        
                        new Response(response, 200, null, user);
                    }
                });
        }
    });
});

module.exports.router = router;