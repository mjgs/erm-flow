// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean,
  topSecret: String,
  semiSecret: String
});

UserSchema.pre('save', function(next) {
  console.log('Creating user: ' + JSON.stringify(this));
  return next();
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('user', UserSchema);
