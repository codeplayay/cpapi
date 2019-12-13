const express = require('express');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Class = require('@models/class');
const Subject = require('@models/subject');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/create/local', function (request, response) {
    // Prepare
    const subject = new Subject({
        _id: new ObjectId(),
        name: request.body.name,
        code: request.body.code,
        pattern: request.body.pattern
    });

    // Run
    Subject(subject).save().then((subject) => {
        // Prepare
        const query = {
            _id: "5df390405a9e4c22ac3b70cf"
        };

        // Run
        Class.findOneAndUpdate(query, {
            "$push": { "subjects": subject._id }
        }, { runValidators: true, new: true }, function (error, _class) {
            if (error) {
                console.error(error);
                new Response(response, 400, null, null);
            } else {
                new Response(response, 200, null, subject);
            }
        });
    }).catch((error) => {
        console.error(error);
        new Response(response, 400, null, null);
    });
});

module.exports.router = router;