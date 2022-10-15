const { json } = require('express');
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express()
const router = express.Router();
const bcrypt = require('bcrypt')
const authentication = require('../middleware/aboutAuth')
require('../db/conn');
const User = require('../model/userSchema'); // now we have validate the user first time register thats why we import userschema -5
const cookieParser = require('cookie-parser')
router.use(cookieParser())

router.get('/', (req, res) => {
    res.send('Hello World! my name is router.js')
  })

  //post the data from user when they call /register -1

  router.post('/register', (req, res)=>{
    // console.log(req.body.name); see only name -2
    const {name, email, phone, work, password, cpassword} = req.body; // now we have store all req.body in once all field -4
    // res.json({ message: req.body}); to retrive the data in our console in json formate -3
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "please fill properly"})
    }
    // now we have check user is already exit or not
    User.findOne({email:email})
    .then((userExit)=>{
        if(userExit){
            return res.status(400).json({error: "this email is salready exit"})
        }
        else if(password != cpassword){
            return res.status(400).json({error: "your password does not match"})
        }
        // if user is not exit then we save their data
        const user = new User({name, email, phone, work, password, cpassword});
        // yaha pe hum use karige hash(bcrypt)-> to middlware is use karinge wo userSchema se karinge
        user.save().then(()=>{
            res.status(201).json({message: "user register successfully"})
        }).catch((error)=>{
            res.status(500).json({message: "registration is failed"})
            console.log(error)
        })

    }).catch((error)=>{
        console.log(error)
    })
  })

//login route
  router.post('/signin', async(req, res)=>{
    //  console.log(req.body);
    //  res.json({message: "awsome"}) 1 and second line for use postman 

    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({error: "field does not empty"})
        } /// this part you can try postman if you dont write any field it show error

        const userlogin = await User.findOne({email : email});// agar user email match ho gaya to usko userlogin me user ka data dikha do
         console.log("here is working")

        if(userlogin){
            const isMatched= await bcrypt.compare(password, userlogin.password) // agar email mil gaya to passowrd check karo
             
            const token = await userlogin.generateAuthToken(); // here we have call genrateAuthToken it define in userSchema yaha pe jo token h wo userSchema se import huaa h
            console.log(token)
            res.cookie('jwtoken', token , {
                expires :new Date(Date.now() + 2592000000), /// expires difine how may times your token is saved in cookie if cookie expire you are logout
                httpOnly:true
            })

            if(!isMatched){
                res.status(400).json({error: "the user is not found"}) // agar user ka password backend k document k password se nahi huaa to
                console.log("user not found")
            }
            else{
                res.status(200).json({message: "the user is successfully login"})// if user is found then it give the message to console 
    
            }

        } 
        else {
            res.json({message:"invalid creditionals"})
        }

    } catch (error) {
        console.log(error)
    }
  })
   router.get('/about', authentication, (req, res) => {
    console.log(req.rootUser)
    res.send(req.rootUser)
  })
  router.get('/contact', authentication, (req, res)=>{
    res.send(req.rootUser)
  })

  router.get('/logout', (req, res)=>{
    res.clearCookie("jwtoken", {path : '/'});
    res.status(200).send("logout")
    console.log("logout successfull")
  })

  module.exports = router // if we not define exports it not be require in app.js
