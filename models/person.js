var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds161400.mlab.com:61400/mydb');
// mongoose.connect('mongodb://localhost:27017/person');
var Schema = mongoose.Schema;

// Define Schema
var personSchema = new Schema({
  firstname : String,
  lastname  : String,
  age       : Number,
  occupation: String,
  time : String,
  myId: String
});

module.exports = mongoose.model('Person', personSchema);
