const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors=require('cors');
const bcrypt=require('bcrypt');
require('dotenv').config();
const saltRounds=10;

require('./models/Blog');
require('./models/User');
const User = require('mongoose').model('User');
const Blog = require('mongoose').model('Blog');



mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log("DATABASE: Connection to database successful!"))
.catch(err => console.log("DATABASE: " + err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));






app.post('/login',(req,res)=>{

    User.findOne({"mail": req.body.mail},async(err,user)=>
    {
        console.log(user);
        if(!user)
        {
            res.send("failure");
        }else{



           await bcrypt.compare(req.body.password, user.password, function (err, result)
           {

            if(result==true)
            {
                res.send("success");
            }else{
                res.send("password incorrect");
            }            
           });
        }

    });
});   

app.post('/register',async(req,res)=>{
const username=req.body.username;
const batch=req.body.batch;
const dept=req.body.dept;
const mail=req.body.mail;
const password=req.body.password;


await bcrypt.hash(password, saltRounds).then(function(hash) {
    const us=new User(
        {username:username, batch:batch, dept:dept, mail:mail,password:hash});
        us.save(function(err){
            if (!err){
                console.log("hel")
                res.send({success:true});
            }
          });
    
});



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