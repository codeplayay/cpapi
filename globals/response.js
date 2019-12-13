module.exports = class Response {
    constructor(response, status, message, data) {
        response.status(status).json({
            message: message,
            prototype: data
        });
    }
};