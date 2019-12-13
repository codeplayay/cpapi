// Function to generate random 6 digit password
// Exporting password generate function
module.exports = function() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}