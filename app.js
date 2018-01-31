var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/rest_blog",{useMongoClient: true});
app.use(bodyParser.urlencoded({extented: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(express.static("public"));

//schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//mongoose model
var Blog = mongoose.model("Blog", blogSchema);

//RESTRoutes

app.get("/", function(req, res){
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res){
   Blog.find({}, function(err, blogs){
      if(err){
          console.log(err);
      }else{
          res.render("index",{blogs:blogs});
      } 
   }); 
});

//new blog entry
app.get("/blogs/new", function(req, res){
   res.render("new"); 
});

//post route
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newblog){
       if(err){
           console.log(err);
       }else{
           res.redirect("/blogs");
       }
   }); 
});

//show page
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", {blog:foundblog});
        }
    });
});

//edit route
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog:foundblog});
        }
    });
});

//update route
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updateblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

//destroy route
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});


//listen to the c9 server
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Blog Server is Running");
}); 