var mongoose = require('mongoose')
const RoutineFormSchema = new mongoose.Schema({
    CName: String,
    CodeId: Number,
    Section: Number,
    Time: String
 
})
var RoutineForm = mongoose.model('Routine', RoutineFormSchema)
module.exports = RoutineForm
