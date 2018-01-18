const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
   Post.find({},'title description', function(error,posts){
     if(error){
       console.log(error);
     }
     res.send({
      posts: posts
    })
  }).sort({_id:-1})
   
  })

  app.get('/posts/:id', (req,res) => {
    Post.findById(req.params.id, 'title description', function(error, post){
      if(error){
        console.log(error);
      }
      debugger
      res.send(post);
    } )
  })

  app.put('/posts/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function(error, post){
      if(error){
        console.log(error);
      }
      post.title = req.body.title
      post.description = req.body.description
      post.save(function(error){
        if(error){
          console.log(error);
        }
        res.send({
          success: true
        })
      })
    })
  })

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/posts');
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var Post = require("../models/posts");

app.post('/posts', (req, res) => {
  var db = req.db;
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  })

  new_post.save(function(error){
    if(error){
      console.log(error);
    }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    
  });
})

app.listen(process.env.PORT || 8081);