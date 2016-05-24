var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var manufacturerAccountSchema = new Schema({
  name: String,
  email: String,
  password: String
});

manufacturerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  hashField: 'password',
  usernameQueryFields: ['mobilePhoneNumber']
});

var ManufacturerAccount = mongoose.model('ManufacturerAccount', manufacturerAccountSchema);

module.exports = ManufacturerAccount;
