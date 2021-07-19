const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({

    username:{
        type:String,
        required:true
    },
    batch:{
        type:String,

    },
    dept:{
        type:String,

    },
    mail:{
        type:String,
        required:true,

    },
    password:{
       type:String,
       required:true 
    }

});

mongoose.model("User", UserSchema);