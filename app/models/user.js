var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String
});

module.exports = mongoose.model('user', UserSchema);
