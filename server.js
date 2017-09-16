"use strict";
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyparser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;
var app = express();

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//static folder
app.use(express.static(path.join(__dirname, 'client')));

//bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function () {
    console.log('server started @ ' + port);
})