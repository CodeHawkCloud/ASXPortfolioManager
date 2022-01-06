//requireing express
const express  = require('express')
const router = express.Router()
//requiring mongoose
const mongoose = require("mongoose")
const mongooseDB = "mongodb+srv://DBMaster:DBKiwwe%21@cluster0.kagld.mongodb.net/ASXPortfolioManagerDB?retryWrites=true&w=majority"
//requring model
const User = require('../models/User')

mongoose.connect(mongooseDB, error =>{

    //if connection success check
    if(error){
        console.log('Error: ' + error)
    }else{
        console.log('Database connection successful!')
    }
})

//handling get request
router.get('/', (req, res) => {
    res.send('API route')
})

//sign up user
router.post('/signUp', (req, res) => {
    
    let userInfo = req.body
    let user = new User(userInfo)

    //saving user to database
    user.save((error, userRegistered) =>{

        if(error){
            console.log('Registration Unsuccesful')
        }else{
            res.status(200).send(userRegistered)
        }

    })

})

//login user
router.post('/login', (req, res) =>{

    let userInfo = req.body

    //find for the username
    User.findOne({username: userInfo.username}, (error, userFound) =>{
        if(error){
            console.log('Login Unsuccesful')
        }else{
            if(!userFound){
                res.status(401).send('Login Unsuccessful')
            }else{
                if(userFound.password !== userInfo.password){
                    res.status(401).send('Login Unsuccesful')
                }else{
                    res.status(200).send(userInfo.username)
                }
            }
        }
    })
})

//add a sale

//add a purchase

//delete a purchase

//view my portfolio

//Edit a stock

//calculate current profit/loss

//calculate sale profit/loss

//export router
module.exports = router