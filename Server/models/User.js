// requiring mongoose and get instance
const mongoose = require('mongoose')

//create a mongoose schema
const mongooseSchema = mongoose.Schema

//purchaseAndHolding Schema
const purchaseAndHoldingSchema = new mongooseSchema({
    companyName: String, 
    Industry: String,
    ticker: String, 
    units: Number, 
    purchasePrice: Number, 
    brokerageFeePurchase: Number, 
    brokerageFeeSale: Number,
    dateBought: Date,
})

//sales schema
const salesSchema = new mongooseSchema({
    companyName: String, 
    industry: String,
    ticker: String, 
    units: Number, 
    purchasePrice: Number, 
    brokerageFeePurchase: Number, 
    brokerageFeeSale: Number,
    dateBought: Date,
    dateSold: Date
})

//user schema
const userSchema = new mongooseSchema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    purchases: [purchaseAndHoldingSchema],
    holdings: [purchaseAndHoldingSchema],
    sales: [salesSchema],
    purchaseCount: Number,
    saleCount: Number
})

//export schema
module.exports = mongoose.model('user', userSchema, 'Users')