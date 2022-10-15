const dotenv = require('dotenv')
const express = require('express')
const app = express()
const path = require('path')
dotenv.config({path: '../config.env'});
require("./db/conn")
const cors = require('cors')

app.use(express.json());
app.use(require('./routes/auth')) // => we link our routes in routes folder auth.js it is middleware function and it is a part of express
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'));
  
}
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
