'use strict'
var express = require('express'), // express lightweight node framework
    mongoose = require('mongoose'), // mongoose abstraction of mongodb
    morgan = require('morgan'), // morgan as logger
    bodyParser = require('body-parser'), // enabling parsing of body params
    dotenv = require('dotenv').config({silent: true}), // make .env available to process.env
    config = require('./config'), // get configuration info
    userRoutes = require('./routes/user_routes'), // get user routes module
    cors = require('cors'), // Cors configuration
    favicon = require('serve-favicon'),
    api = require('./routes/api_routes'); // get api routes module

    var app = express(); // create express app instance
    app.use('cors');  //use CORS
    app.set('port', (process.env.PORT || 8000));   // set port for server

     //-----------------------------------
     // -- connect to mongo database -----
     //-----------------------------------
    mongoose.connect(process.env.MONGOLAB_URI);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database failed to connect!'));
    db.once('open', function() {
      console.log('MongoDB successfully connected on port 27017.');
    });

    //add middleware parser for urlencoded body data POST and URL JSon params
    app.use(bodyParser.urlencoded({extended:false})); //extended = false option => use querystring library
    app.use(bodyParser.json());
    //add middleware for static route
    app.use(express.static('public')); //mount stattic route public
    app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(morgan('dev')); //add morgan middleware logger

    userRoutes(app); // call userRoutes module with app instance
    api(app); // call api routes module with app instance



    // Start the server
    var server = app.listen(app.get('port'), function(){
      console.log("server is running on port " + app.get('port') + "...");
    });

    module.exports = server;
