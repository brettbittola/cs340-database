// Code adapted from the full program at https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/
// Retrieved 8/01/24
// Variables, and specific code structures were adapted to fit this project, but the overall code and project structures belongs to the original source.
// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_mccaffrl',
    password        : '4699',
    database        : 'cs340_mccaffrl'
})

// Export it for use in our applicaiton
module.exports.pool = pool;