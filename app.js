var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var mongoose = require("mongoose");
var app = express();

//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer()); // needs to be after bodyParser


//Mongoose/Model Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  // This code is to put a default image on the blog post if none is added, but is not working for now
  //image: {type: String, default: "https://i0.wp.com/www.revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic.png?resize=300%2C170&ssl=1"},
  body: String,
  created: {type: Date, default: Date.now}
});


var Blog = mongoose.model("Blog", blogSchema);


//RESTful Routes

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

// INDEX
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err){
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
    });
   
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
   //create blog
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       } else {
           //redirect to the index
           res.redirect("/blogs");
       }
   });
   
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("show", {blog: foundBlog});
       }
    });
});


// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err) {
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: foundBlog});
       }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    // destroy blog and redirect
    Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});



