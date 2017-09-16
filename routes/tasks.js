var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('mongodb://10.150.36.21:27017/customtasklist', ['tasks']);
var router = express.Router();

//get all tasks
router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(tasks)
        }
    })
});

//get single tasks
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, tasks) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(tasks)
        }
    })
});

//save tasks
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || task.isDone + '') {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(tasks)
        })
    }
});


//delete tasks
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, tasks) {
        if (err) {
            res.send(err);
        }
        res.json(tasks)
    })
});

//update tasks
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};
    if (task.isDone) {
        updTask.isDone = task.isDone;
    }
    if (task.title) {
        updTask.title = task.title;
    }

    if (!updTask) {
        res.status(400);
        res.json({
            "error": "Bad data"
        });
    }
    else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function (err, tasks) {
            if (err) {
                res.send(err);
            }
            res.json(tasks)
        });
    }
});
module.exports = router;