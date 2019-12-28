const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');
const Subject = require('@models/subject');
const Semester = require('@models/semester');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create/local', async function (request, response) {
    // Prepare
    const subject = new Subject({
        _id: new ObjectId(),
        name: request.body.name,
        code: request.body.code,
        pattern: request.body.pattern
    });

    // Session
    console.log('Start transaction');
    const session = await Subject.startSession();
    session.startTransaction();

    // Run
    console.log('Saving subject');
    Subject(subject).save().then((subject) => {
        // Prepare
        let query = {};

        // Run
        console.log('Finding class');
        Class.findOne(query, function (error, _class) {
            if (error) {
                console.error(error);
                console.log('Could not find class');

                session.abortTransaction();
                session.endSession();
                console.log('Session aborted');

                new Response(response, 400, null, null);
            } else {
                // Prepare
                query = {
                    _id: _class.semester
                }

                // Run
                console.log('Saving subject');
                Semester.findOneAndUpdate(query, {
                    "$push": { "subjects": subject._id }
                }, { runValidators: true, new: true }, function (error, semester) {
                    if(error) {
                        console.error(error);
                        console.log('Could not save subject');

                        session.abortTransaction();
                        session.endSession();
                        console.log('Session aborted');

                        new Response(response, 400, null, null);
                    } else {
                        session.commitTransaction();
                        session.endSession();
                        console.log('Session terminated');

                        new Response(response, 200, null, semester);
                    }
                })
            }
        });
    }).catch((error) => {
        console.error(error);
        console.log('Could not save subject');

        session.abortTransaction();
        session.endSession();
        console.log('Session aborted');

        new Response(response, 400, null, null);
    });
});

module.exports.router = router;