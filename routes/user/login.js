const express = require('express');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

// Models
const User = require('@models/user');

// Globals
const Response = require('@globals/response');

// Configuration
const Config = require('@globals/config.json');

const router = express.Router();

router.post('/login', async function (request, response) {
    // Prepare
    const query = { uid: request.body.uid };

    // Session
    const session = await User.startSession();
    session.startTransaction();

    // Run
    User.findOne(query, function (error, user) {
        if (error) {
            console.error(error);

            session.abortTransaction();
            session.endSession();

            new Response(response, 400, null, null);
        } else if (user) {
            session.commitTransaction();
            session.endSession();
            
            bcrypt.compare(request.body.password, user.password, function (error, verify) {
                if (error) {
                    console.error(error);
                    new Response(response, 500, null, null);
                }

                if (verify === false) {
                    // Verification failed
                    new Response(response, 401, null, null);
                } else {
                    // Valid user 
                    // Generate token
                    const user__token = {
                        _id: user._id,
                        uid: user.uid,
                        _class: user._class,
                        department: user.department
                    };

                    console.log(user__token);

                    jsonwebtoken.sign({ user__token }, Config.private.jwt.key, function (error, token) {
                        if (error) {
                            console.error(error);
                            new Response(response, 500, null, null);
                        } else {
                            new Response(response, 200, null, { token: token, user: user });
                        }
                    });
                }
            });
        } else {
            // User does not exists
            new Response(response, 400, null, null);
        }
    });
});

module.exports.router = router;