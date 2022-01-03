//reuiring express and body parsers
const express  = require('express')
const bodyParser = require('body-parser')

//port for the express server
const expressPort = 3002
//require api to use api.js in the routes folder
const api = require('./routes/api')

//initialize express server
const expressApp = express()

//body parser handling json data
expressApp.use(bodyParser.json())

//enable app to use the api
expressApp.use('/api', api)

//testing get request
expressApp.get('/', function(req, res){

    res.send('Hello')
})

//listening on the port number 3002
expressApp.listen(expressPort, function(){

    console.log("Server running !!!")
})