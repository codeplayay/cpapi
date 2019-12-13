const jsonwebtoken = require('jsonwebtoken');

// Globals
const Config = require('@globals/config.json');
const Response = require('@globals/response');

// Middleware for token decryption
module.exports = function (request, response, next) {
    jsonwebtoken.verify(request.token, Config.private.jwt.key, function (error, data) {
        if (error) {
            console.error(error);
            new Response(response, 401, null, null);
        } else {
            request.body.user = data;
            next();
        }
    });
}