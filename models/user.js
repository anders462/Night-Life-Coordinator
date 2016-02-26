'use strict'

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
var User = new Schema({
    username: String,
    password: String,
    admin: Boolean
});

// pass model it using module.exports
module.exports = mongoose.model('User',User);
