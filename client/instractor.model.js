

var mongoose = require('mongoose')
const InstractorSchema = new mongoose.Schema({
    Name: String,
    Email: String,
    Number: Number,
    CourseName: String,
 
})
var Instractor = mongoose.model('Instractor', InstractorSchema)
module.exports = Instractor
