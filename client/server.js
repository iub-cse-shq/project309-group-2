var http = require('http')
var express = require('express')
var app = express()
var server = http.Server(app)

// your server routes go here

//index or main page
app.get('/', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/index.html')
})

//Course Name and Code page/ course page
app.get('/CourseNameAndCode', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/CourseNameAndCode.html')
})

//Routine Page
app.get('/Routine', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/Routine.html')
})

server.listen(process.env.PORT || 3000, 
process.env.IP || 'localhost', function(){
  				console.log('Server running');
})
module.exports = {app, server}
