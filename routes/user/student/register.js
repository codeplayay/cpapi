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
    console.log('UID : ', uid);

    // Hashing the password
    let password = Password();
    console.log('Password : ', password);

    bcrypt.hash(password.toString(), 8, function (error, hash) {
        if (error) {
            console.error(error);
            new Response(response, 400, null, null);
        }

        // Prepare
        const _id__user = new ObjectId();
        const _id__prototype = new ObjectId();

        const user = new User({
            _id: _id__user,
            fname: request.body.fname,
            mname: request.body.mname,
            lname: request.body.lname,
            uid: uid,
            password: hash,
            role: Config.user.roles[0],
            _prototype: _id__prototype
        });

        // Run
        User(user).save().then((user) => {
            student = new Student({
                _id: user._prototype,
                department: request.body.department,
                _class: request.body._class,
                user: _id__user
            });

            // Run
            Student(student).save().then((prototype) => {
                user._prototype = prototype;
                new Response(response, 200, null, user)
            }).catch((error) => {
                console.error(error);
                new Response(response, 400, null, null);
            })
        }).catch((error) => {
            console.error(error);
            new Response(response, 400, null, null);
        });
    });
});

module.exports.router = router;