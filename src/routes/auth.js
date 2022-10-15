const express = require('express')
const router = express.Router();
require('../db/conn')
const User = require("../models/CovidSchema")



router.post('/', async (req, res)=>{
    try {
        const CovidData = new User(req.body)
        console.log(CovidData);
        res.send(req.body)
        await CovidData.save()
        
    } catch (error) {
        console.log(error)
        
    }
})
router.get("/covid19", async (req, res)=>{
    try {
        const getCovidData = await User.find({})
        res.status(200).send(getCovidData)
    } catch (error) {
        res.send(error)
    }
})
// router.get("/covid19/:id", async (req, res)=>{
//     try {
//         const _id = req.params.id;
//         const getCovidData = await User.findById(_id)
//         res.status(200).send(getCovidData)
//     } catch (error) {
//         res.send(error)
//     }
// })
// router.get("/covid19/:state", async (req, res)=>{
//     try {
//         const _state = req.params.state;
//         const getCovidData = await User.findOne(_state)
//         res.status(200).send(getCovidData)
//         console.log(getCovidData)
//     } catch (error) {
//         res.send(error)
//     }
// })
router.get('/search/:key', async (req, res)=>{
           console.log(req.params.key);            /// params se hum user input lete h
        const getCovidData = await User.find({
            
            "$or":[
                {
                    "state":{$regex:req.params.key}
                }
            ]

        })
        res.send(getCovidData)
})
module.exports = router