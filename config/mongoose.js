// https://mongoosejs.com/docs/index.html
// This is documentation for mongoose

// Require the library
const mongoose = require('mongoose');

// Connect to the database(which we have name contact_list_db)
mongoose.connect('mongodb://localhost/contacts_list_db', {useNewUrlParser: true, useUnifiedTopology: true});

// Acquiring the connection (to check whether it is connected or not)
const db = mongoose.connection;

// Binding the event "error" with console.error command...console.error is same as console.log...it just gives the statement in red with a cross(just like an error)...try in browser console...console.error("")
db.on('error', console.error.bind(console, 'connection error:'));

// Once the databse is connected show the given message on console
db.once('open', function() {
    console.log("Successfully connected to database!!");
});