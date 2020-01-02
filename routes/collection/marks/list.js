const express = require('express');

// Models 
const Class = require('@models/class');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/marks/list', function (request, response) {
    // Prepare
    const query = {
    };

    // Run
    console.log(`Finding class ${request.body._class} and then populating`);
    Class.findOne(query,{ name : 1, department : 1, semester : 1 }).populate({
        path: 'semester',
        select: 'marks',
        populate: {
            path: 'marks',
            select: 'name total passing subject',
            populate: {
                path: 'subject'
            }
        }
    }).exec(function (error, list) {
        if (error) {
            console.error(error);

            console.log('Finding class failed');
            new Response(response, 400, null, null);
        } else {
            console.log('Class found and populated');
            new Response(response, 200, null, list);
        }
    });
});

module.exports.router = router;