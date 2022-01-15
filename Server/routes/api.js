//requireing express
const express  = require('express')
const router = express.Router()
//requiring mongoose
const mongoose = require("mongoose")
const mongooseDB = "mongodb+srv://DBMaster:DBKiwwe%21@cluster0.kagld.mongodb.net/ASXPortfolioManagerDB?retryWrites=true&w=majority"
//requring model
const User = require('../models/User')

//require yahoo finance
const yahooFinance = require('yahoo-finance');

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

//check holding
router.post('/checkHolding', (req, res) =>{

    let saleInfo1 = req.body
    let tempTicker = saleInfo1.ticker
    let tempUnits = saleInfo1.units

    User.findOne(
    {"username": saleInfo1.username},
    (error, userFound)=> {
        if(error){
            res.status(401).send('Error checking Holdings!')
        }else{

            for(let i = 0; i < userFound.holdings.length; i++){
                if(userFound.holdings[i].ticker == tempTicker){
                    if(userFound.holdings[i].units >= tempUnits){

                        // let remainingUnitsAfterSale = tempUnits - userFound.holdings[i].units
                        res.status(200).send(userFound.holdings[i])
                        return
                    }else{
                        res.status(401).send('' + userFound.holdings[i].units)
                        return
                    }
                }

               
            }

            res.status(401).send("Not Found")

        }
    })
})

//add a sale
router.post('/addSale', (req, res) =>{
    
    let saleInfo2 = req.body

    User.updateOne(
        {username: saleInfo2.username},
        {
            $inc: {
                saleCount: 1               
            },
            $push: {
                sales:{
                    companyName: saleInfo2.companyName, 
                    industry: saleInfo2.industry,
                    ticker: saleInfo2.ticker, 
                    units: saleInfo2.units, 
                    purchasePrice: saleInfo2.purchasePrice, 
                    brokerageFeePurchase: saleInfo2.brokerageFeePurchase, 
                    brokerageFeeSale: saleInfo2.brokerageFeeSale,
                    dateBought: saleInfo2.dateBought,
                    dateSold: saleInfo2.dateSold,
                    salePrice: saleInfo2.salePrice
                }
            },
        },
        (error2, call) =>{

            if(error2 || !call.acknowledged){
    
                res.status(401).send("Sale not added!")
            }else{
                res.status(200).send("Sale Added")
            }
        }
    )
})

//remove from holdings
router.post('/removeFromHoldings', (req, res) =>{

    let holdingsInfo = req.body

    User.updateOne(
        {"username": holdingsInfo.username},
        {
            $pull:{
                "holdings": {
                    _id: holdingsInfo.id
                }
            },
            $inc:{
                holdingCount: -1
            }
        },
        (error2, response)=>{
            if(error2 || !response.acknowledged){
                res.status(401).send("Holding Removal Failed")
            }else{
                res.status(200).send("Success")
            }
        }
    )
})

//update holdings
router.post('/updateHoldings', (req, res)=>{

    let holdingsInfo2 = req.body
    let remainingUnits = holdingsInfo2.remainingUnits


    User.updateOne(
        {"username": holdingsInfo2.username, "holdings._id": holdingsInfo2.id},
        {
            $set:{
                "holdings.$.units": remainingUnits
            }
        },
        (error, response) =>{
            if(error || !response.acknowledged){
                res.status(401).send("Update Holdings Failed!")
            }else{
                res.status(200).send(''+remainingUnits)
            }
        }
        
    )
})

//add a purchase
router.post('/addStock', (req, res) =>{

    let purchaseInfo = req.body

    //adding the stock to the database
    User.updateOne(
        {username: purchaseInfo.username}, 
        {
            $inc:{
                purchaseCount: 1,
                holdingCount: 1
            },
            $push:{
                
                purchases:{
                    "companyName" : purchaseInfo.companyName, 
                    "industry" : purchaseInfo.industry,
                    "ticker": purchaseInfo.ticker, 
                    "units": purchaseInfo.units, 
                    "purchasePrice": purchaseInfo.purchasePrice, 
                    "brokerageFeePurchase": purchaseInfo.brokerageFeePurchase, 
                    "brokerageFeeSale": purchaseInfo.brokerageFeeSale,
                    "dateBought": purchaseInfo.dateBought,
                },
                holdings: {

                    "companyName" : purchaseInfo.companyName, 
                    "industry" : purchaseInfo.industry,
                    "ticker": purchaseInfo.ticker, 
                    "units": purchaseInfo.units, 
                    "purchasePrice": purchaseInfo.purchasePrice, 
                    "brokerageFeePurchase": purchaseInfo.brokerageFeePurchase, 
                    "brokerageFeeSale": purchaseInfo.brokerageFeeSale,
                    "dateBought": purchaseInfo.dateBought,
                }
            },
            
        }, 
 
        (error2, response) =>{

            if(error2 || !response.acknowledged){

                res.status(401).send(false)
            }else{
                res.status(200).send(true)
            }
        }
        
    )

})


//view my portfolio (get all holdings values)
router.post('/getHoldings', (req, res)=>{

    let info = req.body

    User.findOne(
        {"username": info.username},
        {"_id": 0, "holdings": 1},
        (error, response)=>{

            if(error){
                res.status(401).send("Erorr loading holdings!")
            }else{
                res.status(200).send(response)
            }
        }
    )
})

//view purchases
router.post('/getPurchases', (req, res)=>{

    let info = req.body

    User.findOne(
        {"username": info.username},
        {"_id": 0, "purchases": 1},
        (error, response)=>{

            if(error){
                res.status(401).send("Erorr loading purchases!")
            }else{
                res.status(200).send(response)
            }
        }
    )
})

//check units
router.post('/checkUnits', (req, res)=>{

    let info = req.body

    User.findOne(
        {"username": info.username},
        (error, userFound)=> {
            if(error){
                res.status(401).send('Error checking Holdings!')
            }else{
    
                for(let i = 0; i < userFound.holdings.length; i++){
                    if(userFound.holdings[i].ticker == info.ticker){
                        res.status(200).send(''+userFound.holdings[i].units)
                        return
                    }
    
                }
    
                res.status(401).send("Not Found")
    
            }
        })

})

//view sales
router.post('/getSales', (req, res)=>{

    let info = req.body

    User.findOne(
        {"username": info.username},
        {"_id": 0, "sales": 1},
        (error, response)=>{

            if(error){
                res.status(401).send("Erorr loading sales!")
            }else{
                res.status(200).send(response)
            }
        }
    )
})

//get current price of a single stock
router.post('/getCurrentPrice', (req, res)=>{

    let stockInfo = req.body

    let conctanatedSymbol = stockInfo.symbol + '.AX'
    

    yahooFinance.quote({
        symbol: conctanatedSymbol,
        modules: ['financialData']
      }, function(error, response) {
        if(error){
            res.status(401).send(error)
        }
        else{
            res.status(200).send(response)
        }
      });
    
})

//get current prices of multiple stocks
router.post('/getMultipleStockCurrentPrices', (req, res)=>{

    let tempSymbols = req.body

    yahooFinance.quote({
        symbols: tempSymbols,
        modules: ['financialData']
      }, function(error, response) {
        if(error){
            res.status(401).send(error)
        }
        else{
            res.status(200).send(response)
        }
      });
  
    
    
})

//export router
module.exports = router