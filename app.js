var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


//Mongoose/Model Config
var blogSchema = new mongoose.Schema({
   title: String,
   image: {type: String, default: "https://i0.wp.com/www.revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic.png?resize=300%2C170&ssl=1"},
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTful Routes




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});