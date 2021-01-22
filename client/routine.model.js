var mongoose = require('mongoose')
const RoutineSchema = new mongoose.Schema({
 courseName: String,
 courseCode: Number,
 time: String,
 section: Number
})
var Routine = mongoose.model('Routine', RoutineSchema)
module.exports = Routine
