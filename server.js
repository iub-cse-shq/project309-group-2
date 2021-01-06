var http = require('http')
var express = require('express')
var app = express()
var server = http.Server(app)
app.use(express.static('public'))

// your server routes go here

//index or main page
app.get('/', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/SignIn.html')
})

app.get('/index', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/index.html')
})

app.get('/SignUp', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/SignUp.html')
})

//Course Name and Code page/ course page
app.get('/CourseNameAndCode', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/CourseNameAndCode.html')
})

//Routine Page
app.get('/Routine', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/Routine.html')
})

server.listen(process.env.PORT || 3000, 
process.env.IP || 'localhost', function(){
  				console.log('Server running');
})
module.exports = {app, server}
