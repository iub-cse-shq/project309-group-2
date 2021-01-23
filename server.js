var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var server = http.Server(app)
const ejs = require('ejs');
var Routine = require('../project309-group-2/client/routineForm.model')
var SignUp = require('../project309-group-2/client/signUp.model')
var Course = require('../project309-group-2/client/course.model')
var Instractor = require('../project309-group-2/client/instractor.model')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

// app.get('/adminContent', function (req, res) { 

//   // Render page using renderFile method 
//   ejs.renderFile('makeCourseContent.ejs', {},  
//       {}, function (err, template) { 
//       if (err) { 
//           throw err; 
//       } else { 
//           res.end(template); 
//       } 
//   }); 
// });
app.get('/adminContent', function (request, response) {
  //console.log(request)
  response.sendFile(__dirname + '/client/makeCourseContent.html')
})

app.get('/SignUp', function (request, response) {
  //console.log(request)
  response.sendFile(__dirname + '/client/SignUp.html')
})

//ALL COURSE PAGE

// app.get('/CourseNameAndCode', function (req, res) { 

//   // Render page using renderFile method 
//   ejs.renderFile('allCourses.ejs', {},  
//       {}, function (err, template) { 
//       if (err) { 
//           throw err; 
//       } else { 
//           res.end(template); 
//       } 
//   }); 
// });

// app.get('/RoutineForm', function (request, response) {
//   //console.log(request)
//   response.sendFile(__dirname + '/client/RoutineForm.html')
// })

//Course Name and Code page/ course page
app.get('/CourseNameAndCode', function (request, response) {

  Course.find({}, function (err, data) {
    response.render('allCourses.ejs', {
      courses: data
    })
  })
})



// app.get('/CourseNameAndCode', function (request, response) {
//     //console.log(request)
//     response.sendFile(__dirname + '/client/CourseNameAndCode.html')
// })

//Routine Page
// app.get('/routine', function (request, response) {
//     //console.log(request)
//     response.sendFile(__dirname + '/client/Routine.html')
// })

app.get('/routine', function (request, response) {

  Course.find({}, function (err, data) {
    response.render('Routine.ejs', {
      courses: data
    })
  })
})

app.get('/addTime', function (request, response) {
  //console.log(request)
  response.sendFile(__dirname + '/client/RoutineForm.html')
})


app.post('/CourseTime/new', function (request, response) {
  var newCourseTime = new Routine(request.body)
  newCourseTime.save(function (err, data) {
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




app.post('/course/new', function (request, response) {
  var newCourse = new Course(request.body)
  newCourse.save(function (err, data) {
    if (err)
      return response.status(400).json({
        error: 'New course is not added successfully'
      })
    return response.status(200).json({
      message: 'Course Created Successfully'
    })
  })
})


app.post('/instractor/new', function (request, response) {
  var newInstractor = new Instractor(request.body)
  newInstractor.save(function (err, data) {
    if (err)
      return response.status(400).json({
        error: 'New instractor is not added successfully'
      })
    return response.status(200).json({
      message: 'Instractor Created Successfully'
    })
  })
})

// app.post('/routineForm/new', function (request, response) {
//   var newRoutine = new Routine(request.body)
//   newRoutine.save(function (err, data) {
//           if (err)
//             return response.status(400).json({
//              error: 'Course Name is missing'
//             })
//           return response.status(200).json({
//             message: 'Routine Created Successfully'

//       })
//  })
// }) 



app.get('/routine/:id', function (request, response) {
  app.get('/routine/:id', function (request, response) {
    Routine.findById(request.params.id, function (err, data) {
      response.render('routine.ejs', {
        routine: data
      })
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

//All Courses Route From goes here....................................
app.get('/203', function (request, response) {

  Course.find({}, function (err, data) {
    response.render('dataStructure.ejs', {
      courses: data
    })
  })
})
app.get('/211', function (request, response) {

  Course.find({}, function (err, data) {
    response.render('algorithm.ejs', {
      courses: data
    })
  })
})

app.get('/213', function (request, response) {

  Course.find({}, function (err, data) {
    response.render('objectOriented.ejs', {
      courses: data
    })
  })
})

app.get('/routineForm/:id', function (request, response) {
  Routine.findById(request.params.id, function (err, data) {
    response.render('routineForm.ejs', {
      routine: data
    })
  })
})

app.get('/routineForms/all', function (request, response) {
  Routine.find({}, function (err, data) {
    response.render('allRoutineForms.ejs', {
      routines: data
    })
  })
})

//Tutorial Page

// app.get('/Tutor', function (request, response) {

//   Course.find({}, function (err, data) {
//     response.render('tutorial.ejs', {
//       courses: data
//     })
//   })
// })


app.get('/instractor', function (request, response) {
  //console.log(request)
  response.sendFile(__dirname + '/client/instractor.html')
})

app.get('/Allinstractor', function (request, response) {
  Instractor.find({}, function (err, data) {
    response.render('tutorial.ejs', {
      instractors: data
    })
  })
})


server.listen(process.env.PORT || 3000,
  process.env.IP || 'localhost', function () {
    console.log('Server running');
  })
module.exports = { app, server, mongoose }
