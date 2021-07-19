const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const BlogSchema = new Schema({

    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    categ:{
        type:String,
        required:true
    }


});

mongoose.model('Blog', BlogSchema);