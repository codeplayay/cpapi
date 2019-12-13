const express = require('express');

// Globals
const Config = require('@globals/config.json');
const Response = require('@globals/response');

const router = express.Router();

router.post('/app', function(_, response) {
    new Response(response, 200, null, Config.app);
});

module.exports.router = router;