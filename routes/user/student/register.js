const express = require('express');
const bcrypt = require('bcryptjs');

// ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

// Models
const User = require('@models/user');
const Student = require('@models/student');

// Globals
const Response = require('@globals/response');
const Config = require('@globals/config.json');

// Functions
const Uid = require('@functions/uid');
const Password = require('@functions/password');

const router = express.Router();

router.post('/student/register', function (request, response) {
    // Generating user id
    let uid = Uid();
    console.log('UID\t: ', uid);

    // Hashing the password
    let password = Password();
    console.log('Password : ', password);

    bcrypt.hash(password.toString(), 8, async function (error, hash) {
        if (error) {
            console.error(error);

            console.log('Failed to hash');
            new Response(response, 400, null, null);
        }

        // Prepare
        const userId = new ObjectId();
        const prototypeId = new ObjectId();

        const user = new User({
            _id: userId,
            fname: request.body.fname,
            mname: request.body.mname,
            lname: request.body.lname,
            uid: uid,
            password: hash,
            // Student
            role: Config.user.roles.student.name,
            _prototype: prototypeId
        });

        // Session
        console.log('Session started');
        const session = await User.startSession();
        session.startTransaction();

        // Run
        console.log(`Registering user ${request.body.fname} ${request.body.mname} ${request.body.lname}`);
        User(user).save().then((user) => {
            console.log('User registered');

            student = new Student({
                _id: user._prototype,
                department: request.body.department,
                _class: request.body._class,
                user: userId
            });

            // Run
            console.log('Saving student prototype');
            Student(student).save().then((prototype) => {
                console.log('Prototype saved');

                user._prototype = prototype;

                session.commitTransaction();
                session.endSession();
                console.log('Session terminated');

                new Response(response, 200, null, user)
            }).catch((error) => {
                console.error(error);

                session.abortTransaction();
                session.endSession();
                console.log('Session aborted');

                new Response(response, 400, null, null);
            })
        }).catch((error) => {
            console.error(error);

            session.abortTransaction();
            session.endSession();
            console.log('Session aborted');

            new Response(response, 400, null, null);
        });
    });
});

module.exports.router = router;