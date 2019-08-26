var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExerciseSchema = new Schema({
    user_id: String,
    workout_id: String,
    name: String,
    recorded: Date,
    sets: Number,
    reps: Number
});

module.exports = mongoose.model('Exercise', ExerciseSchema);