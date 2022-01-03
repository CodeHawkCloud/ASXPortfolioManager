// requiring mongoose and get instance
const mongoose = require('mongoose')

//create a mongoose schema
const mongooseSchema = mongoose.Schema

//create user schema
const userSchema = new mongooseSchema({
    username: String,
    password: String
})

//export schema
module.exports = mongoose.model('user', userSchema, 'Users')