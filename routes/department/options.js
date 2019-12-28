const express = require('express');

// Models
const Department = require('@models/department');

// Globals
const Response = require('@globals/response');

const router = express.Router();

router.post('/options', function (_, response) {
    // Prepare
    const query = {};

    // Run
    console.log('Enlisting departments');
    Department.find(query, function (error, list) {
        if (error) {
            console.error(error);

            console.log('Enlisting departments failed');
            new Response(response, 200, null, null);
        } else {
            var options = [];

            list.forEach(option => {
                options.push({
                    _id: option._id,
                    label: option.name
                })
            });

            console.log('Departments enlisted');
            new Response(response, 400, null, null);
        }
    });
});

module.exports.router = router;