const mongoose = require("mongoose")

userSchema = new mongoose.Schema({
  
    state:{
        type:String,
        required:true,
        minLength:3,
        unique: true
    },
    cases:{
        type:String,
        required:true,
        minLength:1
    },
    death:{
        type:String,
        required:true,
        minLength:1
    },
    country:{
        type:String,
        minLength:2,
        default:"IN"

    }


})

const User = mongoose.model('CORONA', userSchema);
module.exports=User;