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
    const session = await Subject.startSession();
    session.startTransaction();

    // Run
    Subject(subject).save().then((subject) => {
        // Prepare
        let query = {};

        // Run
        Class.findOne(query, function (error, _class) {
            if (error) {
                console.error(error);

                session.abortTransaction();
                session.endSession();

                new Response(response, 400, null, null);
            } else {
                // Prepare
                query = {
                    _id: _class.semester
                }

                // Run
                Semester.findOneAndUpdate(query, {
                    "$push": { "subjects": subject._id }
                }, { runValidators: true, new: true }, function (error, semester) {
                    if(error) {
                        console.error(error);

                        session.abortTransaction();
                        session.endSession();

                        new Response(response, 400, null, null);
                    } else {
                        session.commitTransaction();
                        session.endSession();

                        new Response(response, 200, null, semester);
                    }
                })
            }
        });
    }).catch((error) => {
        console.error(error);

        session.abortTransaction();
        session.endSession();

        new Response(response, 400, null, null);
    });
});

module.exports.router = router;