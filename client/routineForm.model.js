var mongoose = require('mongoose')
const RoutineFormSchema = new mongoose.Schema({
 coursenName: String,
 id: Number,
 time: Date,
 section: Number
})
var RoutineForm = mongoose.model('Routine', RoutineFormSchema)
module.exports = RoutineForm
