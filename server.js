var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = http.Server(app)
var Routine = require('./routine.model')
var SignUp = require('./signUp.model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

//DB connection
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var dbURL = 'mongodb://localhost:27017/projectGroup#2' 
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', function (err) {
 console.log(err)
})


//Server routes are here
//index or main page
app.get('/', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/SignIn.html')
})

app.get('/index', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/index.html')
})

app.get('/signUp/SignUp', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/SignUp.html')
})

//Course Name and Code page/ course page
app.get('/CourseNameAndCode', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/CourseNameAndCode.html')
})

//Routine Page
app.get('/routine/Routine', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/Routine.html')
})

var routines = [{title: 'test', content: 'test'},
                {title: 'test2', content: 'test2'},
                {title: 'test3', content: 'test3'}]
app.post('/routine/new', function (request, response) {
    var newRoutine = new Routine(request.body)
    newRoutine.save(function (err, data) {
      if (err)
        return response.status(400).json({
          error: 'Title is missing'
        })
      return response.status(200).json({
        message: 'Routine created successfully'
      })
    })
   })

var SignUps = [{title: 'test', content: 'test'},
                   {title: 'test2', content: 'test2'},
                   {title: 'test3', content: 'test3'}]
app.post('/signUp/new', function (request, response) {
    var newSignUp = new SignUp(request.body)
        newSignUp.save(function (err, data) {
            if (err)
              return response.status(400).json({
               error: 'Title is missing'
              })
            return response.status(200).json({
              message: 'SignUp created successfully'
        })
   })
}) 

   app.get('/routine/:id', function (request, response) {
    Routine.findById(request.params.id, function (err, data) {
      response.render('routine.ejs', {
        routine: data
      })
    })
   })
   
   
   app.get('/routines/all', function (request, response) {
    Routine.find({}, function (err, data) {
      response.render('allRoutines.ejs', {
        routines: data
      })
    })
   })
   
   app.get('/signUp/:id', function (request, response) {
    Routine.findById(request.params.id, function (err, data) {
      response.render('signUp.ejs', {
        routine: data
      })
    })
   })
   
   
   app.get('/signUps/all', function (request, response) {
    Routine.find({}, function (err, data) {
      response.render('allSignUps.ejs', {
        routines: data
      })
    })
   })

server.listen(process.env.PORT || 3000, 
process.env.IP || 'localhost', function(){
  				console.log('Server running');
})
module.exports = {app, server}
