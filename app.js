//Code adapted and modified from https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// App.js
/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9284;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/*
    ROUTES
*/
// Copies page

app.get('/copies', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM Copies;";

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('copies', {name: 'Copies', data: rows});                  // Render the copies.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query   

app.post('/add-copy-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Copies (mediaID, customerID) VALUES ('${data['input-mediaID']}', '${data['input-customerID']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/copies');
        }
    })
});

app.delete('/delete-copy-ajax/', function(req,res,next){
  let data = req.body;
  let copyID = parseInt(data.id);
  let deleteCopy = `DELETE FROM Copies WHERE copyID = ?`;


        // Run the 1st query
        db.pool.query(deleteCopy, [copyID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
})});

app.put('/put-copy-ajax', function(req,res,next){                                   
  let data = req.body;

  let mediaID = parseInt(data.mediaID);
  let customerID = parseInt(data.customerID);

  queryUpdateCopy = `UPDATE Copies SET customerID = ? WHERE mediaID = ?`;
  selectCopy = `SELECT * FROM Copies WHERE mediaID = ?`

        // Run the 1st query
        db.pool.query(queryUpdateCopy, [customerID, mediaID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectCopy, [mediaID], function(error, rows, fields) {
        
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});


// Types page
app.get('/types', function(req, res)
    {  
        let query1 = "SELECT * FROM Types;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('types', {name: 'Types', data: rows});                  // Render the types.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.post('/add-type-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Types (typeName) VALUES ('${data['input-typeName']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/types');
        }
    })
})


// Customers Page

app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {name: 'Customers', data: rows});                  // Render the customers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (firstName, lastName, phoneNumber, email) VALUES 
                                    ('${data['input-firstName']}', '${data['input-lastName']}', '${data['input-phoneNumber']}', '${data['input-email']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customers');
        }
    })
})

app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomers= `DELETE FROM Customers WHERE customerID = ?`;
  
        // Run the 1st query
        db.pool.query(deleteCustomers, [customerID], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            else {
                res.sendStatus(204);
            }
})});
    
app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;

    let phoneNumber = data.phoneNumber;
    let person = parseInt(data.fullname);

    let queryUpdatePhoneNumber = `UPDATE Customers SET phoneNumber = ? WHERE Customers.customerID = ?`;
    let selectPerson = `SELECT * FROM Customers WHERE customerID = ?`
        // Run the 1st query
        db.pool.query(queryUpdatePhoneNumber, [phoneNumber, person], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                // Run the second query
                db.pool.query(selectPerson, [person], function(error, rows, fields) {
  
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
})});


// Media page
app.get('/index', function(req, res)
    {  
        let query1 = "SELECT * FROM Media;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {name: 'Media', data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.post('/add-media-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Media (title, creatorID, typeID) VALUES 
                                    ('${data['input-title']}', '${data['input-creatorID']}', '${data['input-typeID']}')`;    
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/index');
        }
    })
})

// Creators page
app.get('/creators', function(req, res)
    {  
        let query1 = "SELECT * FROM Creators;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('creators', {name: 'Creators', data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

app.post('/add-creator-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Creators (creatorName) VALUES ('${data['input-creatorName']}')`;    
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/creators');
        }
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});