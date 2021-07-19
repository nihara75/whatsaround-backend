const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();

require('./models/Blog');
//const User = require('mongoose').model("User");
const Blog = require('mongoose').model('Blog');



mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log("DATABASE: Connection to database successful!"))
.catch(err => console.log("DATABASE: " + err));

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));






app.post('/login',(req,res)=>{


});

app.post('/register',(req,res)=>{


});

app.post('/blog',(req,res)=>{

    
    const tit=req.body.title;
    const con=req.body.content;
    const typ=req.body.category;

    

    const bg=new Blog({title:tit,content:con,categ:typ});
    bg.save(function(err){
        if (!err){
            console.log("hel")
            res.send({success:true});
        }
      });
});

app.get('/blogd/:cat',(req,res)=>{
    const categ=req.params.cat;
    Blog.find({categ:categ},(err,posts)=>{

        if(!err)
          res.send(posts);
        else
          console.log(err);  
    });


});

const PORT = process.env.PORT || 6000;

app.listen(PORT, (err) => {
    if(err) return console.log(err);
    console.log(`Listening to port ${PORT}`);
})