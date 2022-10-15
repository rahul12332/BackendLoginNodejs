const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const app = express()
// const port = process.env.PORT || 3000
app.use(express.json());
app.use(cors());// to understand the json formate which we filled in our postman or postman k console me wo response dega or humare terminal me b
dotenv.config({path: './config.env'});// define once in main app.js file it will retrive any file 
require('./db/conn')// fb file import and require
app.use(require('./routes/auth')) // => we link our routes in routes folder auth.js it is middleware function and it is a part of express
// const User = require('./model/userSchema')
const PORT = process.env.PORT;


// const middleware=(req, res, next)=>{
//  console.log(`hello i am middleware`)
//  next()
// }


app.get('/', (req, res) => {
  res.send('Hello World! my name is khan')
})
app.get('/contact', (req, res) => {
    res.send('Hello World! from contact')
  })
  app.get('/about',  (req, res) => {
    // res.cookie("jwtoken", "test") //to test to store cookie
    res.send('Hello World! from about')
  })
  // app.get('/signin', (req, res) => {
  //   res.send('Hello World! from signin')
  // })
  app.get('/signup', (req, res) => {
    res.send('Hello World! from signup')
  })
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})