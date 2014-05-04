//server.js
'use strict';
//Packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //for getting data from a post
var mongoose = require('mongoose');
var User = require('./app/models/user');

app.use(bodyParser());

//set up envs
var port = process.env.PORT || 8080;

//routing
var router = express.Router();

//Do this for every route/request
router.use(function(req, res, next) {
    console.log('There was a server request');
    next(); //go on to specific route
});

//On routes that end in /users
router.route('/users')
//create a user accessed at /api/users
.post(function(req, res) {
    var user = new User();
    user.username = req.body.username

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'User created!'
        });
    });
})

//get all users accessed at /api/users
.get(function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
});

//On routes that end in /users/:user_id
router.route('/users/:user_id')
//Find user by id
.get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
})

.put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        user.username = req.body.username;
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({
                message: 'User updated!'
            });
        });
    });
})

.delete(function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User deleted!'
        });

    });
});


router.get('/', function(req, res) {
    res.json({
        message: 'Welcome to Express Server IV'
    });
});

app.use('/api', router); //prefix every route with /api

mongoose.connect('mongodb://localhost/database');

app.listen(port);
console.log('Listening on port' + port);
