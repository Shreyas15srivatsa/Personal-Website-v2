var mongoose = require("mongoose");

// Setup Mongoose Schema
var contactSchema = new mongoose.Schema({
	name : String,
	email:String,
	question:String
});

// Compile the model
module.exports = mongoose.model("Contact",contactSchema);