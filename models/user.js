var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    user_id: Date,
    age: Number,
    weight: Number
});

module.exports = mongoose.model('User', UserSchema);