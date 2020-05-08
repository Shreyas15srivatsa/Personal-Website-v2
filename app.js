const express = require("express"),
	  app 	  = express(),
	  bodyParser = require("body-parser"),
	  mongoose = require("mongoose"),
	  Contact = require("./models/contact"),
	  flash = require("connect-flash");

// require the .env file
require('dotenv').config();

// Default to .ejs
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

// Body parser config.
app.use(bodyParser.urlencoded({extended:true}));



// Connect to mongodb.
mongoose.connect(process.env.DB_URL,{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(()=>{
	console.log("connected to db");
}).catch(err=>{
	console.log("ERROR:", err.message);
});

app.use(require("express-session")({
	secret: "This is a secret",
	resave:false,
	saveUninitialized:false
	
}));

app.use(flash());

app.use(function(req,res,next){
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.get("/", function(req,res){
	res.render("landing");
});

app.get("/aboutme", function(req,res){
	res.render("aboutme",{page:"aboutme"});
});

app.get("/contactme", function(req,res){
	res.render("contactme",{page:"contactme"});
});

app.post("/contactme", function(req,res){
	
	Contact.create(req.body.contact, function(err, campground) {
			if (err) {
				 req.flash('error', err.message);
				 return res.redirect('back');
			}
			req.flash("success","Successfully submitted the question!");
			res.redirect('/aboutme');
		});
});

app.get("/experiences", function(req,res){
	res.render("experiences",{page:"experiences"});
});

app.get("/projects", function(req,res){
	res.render("projects",{page:"projects"});
});

app.get("*", function(req,res){
	req.flash("error","The page you requested does not exist. Redirected to the home page.")
	res.redirect("/aboutme");
});

const port = process.env.NODE_ENV === 'DEV' ? '3000' : process.env.PORT;
app.listen(port, function(req,res){
	console.log("listening to port " + port);
});