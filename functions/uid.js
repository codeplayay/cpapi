// Function to generate unique user id
// Exporting user id generate function
module.exports = function() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}