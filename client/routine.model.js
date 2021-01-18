var mongoose = require('mongoose')
const RoutineSchema = new mongoose.Schema({
 coursenName: String,
 id: Number,
 time: Date,
 section: Number
})
var Routine = mongoose.model('Routine', RoutineSchema)
module.exports = Routine
