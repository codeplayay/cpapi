const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Marks = require('@models/marks');
const Class = require('@models/class');
const Student = require('@models/student');
const Semester = require('@models/semester');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/create', async function (request, response) {

    // Get all students
    // Prepare
    const query = {
        _class: request.body._class
    };

    // Session
    const session = await Student.startSession();
    session.startTransaction();

    Student.find(query).populate('user').exec((error, students) => {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        }

        var scores = students.map((student) => {
            return {
                student: student._id,
                marks: 0
            };
        });

        // Prepare marks
        const marks = new Marks({
            _id: new ObjectId(),
            name: request.body.name,
            total: request.body.total,
            passing: request.body.passing,
            subject: request.body.subject,
            scores: scores
        });

        Marks(marks).save().then((marks) => {
            if (error) {
                console.error(error);

                session.abortTransaction();
                session.endSession();

                new Response(response, 400, null, null);
            }

            const query = {
                _id: request.body._class
            };

            Class.findOne(query).exec((error, _class) => {
                if (error) {
                    console.error(error);

                    session.abortTransaction();
                    session.endSession();

                    new Response(response, 400, null, null);
                }

                const query = {
                    _id: _class.semester
                };

                Semester.findOneAndUpdate(query, {"$push": { "marks" : marks.scores }}).exec((error, semester) => {
                    if (error) {
                        console.error(error);

                        session.abortTransaction();
                        session.endSession();

                        new Response(response, 400, null, null);
                    }

                    session.commitTransaction();
                    session.endSession();

                    new Response(response, 200, null, marks);
                });
            });
        }).catch((error) => {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            
            new Response(response, 400, null, null);
        });
    });
});

module.exports.router = router;