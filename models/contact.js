const mongoose = require('mongoose');

// Creating Schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// giving name to the collection that will be made using the schema defined above
// first letter of model name(or collection name) is capital by naming convention
const Contact = mongoose.model("Contact", contactSchema);

// exporting this collection
module.exports = Contact;