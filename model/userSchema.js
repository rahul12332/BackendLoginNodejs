const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

})

/// using middlware it is abstraction method 

userSchema.pre('save', async function(next){
    console.log("hiifrom inside the middleware")
      if(this.isModified('password')){

        this.password= await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
      }
      next();
      console.log("constructor end")

});

userSchema.methods.generateAuthToken = async function(){
 try {
    let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY); //sign methon me payload pass karinge jaise id jo ki unique hoti or id her document me autogenrate huie hoti h or ek secrate key passakringe
        // SECRET_KEY Ko hum config.env me define karinge or esme minimum 32 charcter hone hi chahiye 
        this.tokens = this.tokens.concat({token:token}); // jo token h wo mere token se equal krna h (phala wola token user schema ka h dusra wala auth genrate wala h)
       await this.save(); // yaha pe humko token save b krna h yaha ye promise return kr raha h
       return token; // yaha pe hum token return isliye kr re h taki waha get ho sake auth.js me
} catch (error) {
    console.log(error)
 }

}

const User = mongoose.model('USER', userSchema);
module.exports=User;