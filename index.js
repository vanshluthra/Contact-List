/* The below code is before connecting MongoDb 

const express = require("express");
const path = require("path");
const port = 8000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use() is used for adding middlewares
// This is needed so that we can parse the post request conatining the data sent from Form
app.use(express.urlencoded());

// This is needed to include static files(css, javascript) to our project
// As our view files aur .ejs files and not .html files...so after adding them in .ejs we also need this middleware to include them
// Also be careful in defining path of static files...they should be relative to folder whose name is given here in this middleware
app.use(express.static("assests"));

var contactList = [
    {
        name: "User 1",
        phone: "129832847"
    },
    {
        name: "User 2",
        phone: "673827394"
    },
    {
        name: "User 3",
        phone: "876989879"
    }
]

app.get("/", function(req, resp){
    return resp.render("home",{
        title: "Contact List",
        contact_list: contactList
    });
});

app.post("/create-contact", function(req, resp){
    // This body object needs to be parsed first...so include middleware first before doing this
    //console.log(req.body);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // The above push in contactList array can be done in a single line as
    contactList.push(req.body);

    // return resp.redirect("/");
    
    // To go back to immediate previous page...we can go as
    return resp.redirect("back");
});

app.get("/delete-contact", function(req, resp){
    // phone query parameter is passed from delete anchor tag in ejs file
    let phone = req.query.phone;

    // findIndex is a javascript function which returns the index of object(if it exits else -1) as per the function passed to it
    let contactIndex = contactList.findIndex( (con)=>{ return con.phone == phone});
    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return resp.redirect("back");
})

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("ExpressJs is running!!")
    }
});
*/

const express = require("express");
const path = require("path");
const port = 8000;

// Including database config file
const db = require("./config/mongoose");

// Importing the collection Contact
const Contact = require("./models/contact");

const app = express();

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use() is used for adding middlewares
// This is needed so that we can parse the post request conatining the data sent from Form
app.use(express.urlencoded());

// This is needed to include static files(css, javascript) to our project
// As our view files aur .ejs files and not .html files...so after adding them in .ejs we also need this middleware to include them
// Also be careful in defining path of static files...they should be relative to folder whose name is given here in this middleware
app.use(express.static("assests"));

app.get("/", function(req, resp){
    // Fetching data from database and displaying it
    // find is a function which searches the collection that calls it for any query passed to it(if any else it returns all the documents in that collection)
    // It accepts 2 parameters...first is the query and second is callback function(whose 2nd parameter contains everyting that this finc function will return)
    Contact.find({}, function(err, contacts){
        if(err){
            console.log(err);
            return;
        }
        else{
            return resp.render("home",{
                title: "Contact List",
                contact_list: contacts
            });
        }
    });
});

app.post("/create-contact", function(req, resp){
    // This body object needs to be parsed first...so include middleware first before doing this
    //console.log(req.body);
    
    // Creating a document and adding it to the collection that we imported
    // create function takes 2 arguments...first is the data(in the form of our schema) that we want to add and a callback function...which is used to check for errors
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log(err);
            return;
        }
        else{
            //console.log("Contact created:", newContact);
            return resp.redirect("back");
        }
    })
});

app.get("/delete-contact", function(req, resp){
    // Every document created have a unique id which we can use for deleting
    //Remember to update the url parameter in home.ejs file to id instead of phone number as done previosuly
    let id = req.query.id;

    // findByIdAndDelete is a function which takes an id query..finds object corresponding to it and deletes it automatically
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            return resp.redirect("back");
        }
    });
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("ExpressJs is running!!")
    }
});