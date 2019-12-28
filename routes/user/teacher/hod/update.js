const express = require('express');

// Models
const User = require('@models/user');
const Teacher = require('@models/teacher');

// Globals
const Response = require('@globals/response');
const Config = require('@globals/config.json');

const router = express.Router();

router.post('/teacher/hod/update', async function (request, response) {
    // Prepare
    const query = {
        _id: request.body.newHODId,
        // Teacher
        role: Config.user.roles.teacher.name,
    };

    // Session
    console.log('Session started');
    const session = await User.startSession();
    session.startTransaction();

    // Run
    // Find user
    console.log(`Finding user ${request.body.newHODId}`);
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

            console.log(`Updating new HOD prototype`);
            Teacher.findOneAndUpdate(query, { $set: { hod: request.body.department } },
                { runValidators: true, new: true }, function (error, teacher) {
                    if (error) {
                        console.error(error);

                        session.abortTransaction();
                        session.endSession();
                        console.log('Session aborted');

                        new Response(response, 400, null, null);
                    } else {
                        console.log('New HOD updated');

                        user._prototype = teacher;

                        // If old HOD is same as new HOD
                        // OR
                        // Allocating HOD for the first time
                        if (request.body.oldHODPrototype === teacher || request.body.oldHODPrototype === -1) {
                            session.commitTransaction();
                            session.endSession();
                            console.log('Session terminated');

                            console.log(user);
                            new Response(response, 200, null, user);

                        } else {
                            console.log(`Updating old HOD prototype`);
                            const query = {
                                _id: request.body.oldHODPrototype
                            };
                            Teacher.findOneAndUpdate(query, { $set: { hod: null } },
                                { runValidators: true, new: true }, function (error, _) {
                                    if (error) {
                                        console.error(error);

                                        session.abortTransaction();
                                        session.endSession();
                                        console.log('Session aborted');

                                        new Response(response, 400, null, null);
                                    } else {
                                        console.log('Old HOD updated');

                                        session.commitTransaction();
                                        session.endSession();
                                        console.log('Session terminated');

                                        console.log(user);
                                        new Response(response, 200, null, user);
                                    }
                                });
                        }
                    }
                });
        }
    });
});

module.exports.router = router;