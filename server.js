var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = http.Server(app)
const ejs = require('ejs'); 
var Routine = require('../project309-group-2/client/routine.model')
var SignUp = require('../project309-group-2/client/signUp.model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'))

//DB connection
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var dbURL = 'mongodb://localhost:27017/projectGroup2' 
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('error', function (err) {
 console.log(err)
})


//Server routes are here
//index or main page
// app.get('/', function (request, response) {
//     //console.log(request)
//     response.sendFile(__dirname + '/views/SignIn.ejs')
// })

app.get('/', function (req, res) { 
  
  // Render page using renderFile method 
  ejs.renderFile('signIn.ejs', {},  
      {}, function (err, template) { 
      if (err) { 
          throw err; 
      } else { 
          res.end(template); 
      } 
  }); 
});

// app.get('/index', function (request, response) {
//     //console.log(request)
//     response.sendFile(__dirname + '/client/index.html')
// })

app.get('/index', function (req, res) { 
  
  // Render page using renderFile method 
  ejs.renderFile('index.ejs', {},  
      {}, function (err, template) { 
      if (err) { 
          throw err; 
      } else { 
          res.end(template); 
      } 
  }); 
});

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
app.get('/routine/Routine', function (request, response) {
    //console.log(request)
    response.sendFile(__dirname + '/client/Routine.html')
})
 
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

 
app.post('/signUp/new', function (request, response) {
    var newSignUp = new SignUp(request.body)
        newSignUp.save(function (err, data) {
            if (err)
              return response.status(400).json({
               error: 'Title is missing'
              })
            return response.status(200).json({
              message: 'Account Created Successfully'
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
module.exports = {app, server,mongoose}
