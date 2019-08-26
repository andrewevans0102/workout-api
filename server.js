const express    = require('express');       
const app        = express();                 
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
require('dotenv').config();
mongoose.connect('mongodb://localhost/workout', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
const router = express.Router(); 
const Exercise = require('./models/exercise');
const User = require('./models/user');

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hello world!' });   
});

// user
// exercise
// workouts = groups of exercises for a specific user
// 1 user 1 workout multiple exercises
// goals
// food
// water

router.route('/exercise')
    .post(function(req, res) {
        const exercise = new Exercise();
        exercise.user_id = req.body.user_id;
        exercise.workout_id = req.body.workout_id;
        exercise.name = req.body.name;
        exercise.recorded = req.body.recorded;
        exercise.sets = req.body.sets;
        exercise.reps = req.body.reps;

        exercise.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Exercise recorded!' });
        });

    })

    .get(function(req, res) {
        Exercise.find(function(err, exercises) {
            if (err)
                res.send(err);

            res.json(exercises);
        });
    })

    .put(function(req, res) {
        const exercise = new Exercise();
        exercise.id = req.body.id;
        exercise.user_id = req.body.user_id;
        exercise.workout_id = req.body.workout_id;
        exercise.name = req.body.name;
        exercise.recorded = req.body.recorded;
        exercise.sets = req.body.sets;
        exercise.reps = req.body.reps;

        // use save for update here
        // there is update functionality with mongoose but just
        // using the save here is easier and enables you to
        // make a change and save to the same document
        exercise.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Exercise updated!' });
        });
    })

    .delete((req, res) => {
        Exercise.remove(req.body, function(err, response) {
            if (err)
                res.send(err);
            
            res.json(response);
        });
    });

router.route('/user')
    .post(function(req, res) {
        const user = new User();
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.user_id = req.body.user_id;
        user.age = req.body.age;
        user.weight = req.body.weight;

        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'User recorded!' });
        });

    })

    .get(function(req, res) {
        User.find(function(err, exercises) {
            if (err)
                res.send(err);

            res.json(exercises);
        });
    })

    .put(function(req, res) {
        const user = new User();
        user.id = req.body.id;
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.user_id = req.body.user_id;
        user.age = req.body.age;
        user.weight = req.body.weight;

        // use save for update here
        // there is update functionality with mongoose but just
        // using the save here is easier and enables you to
        // make a change and save to the same document
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Exercise updated!' });
        });
    })

    .delete((req, res) => {
        User.remove(req.body, function(err, response) {
            if (err)
                res.send(err);
            
            res.json(response);
        });
    });

app.use('/api', router);

app.listen(port);
console.log('server started on port ' + port);