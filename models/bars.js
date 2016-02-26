'use strict'

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose'),
    AutoIncrement = require('mongoose-sequence');

var Schema = mongoose.Schema;

// set up a mongoose model
var Bars = new Schema({
    name: String,
    location: String,
    going: [{username: String, confirmed: Boolean}]
});

// Create a AutoIncremented id field
Bars.plugin(AutoIncrement, {inc_field: 'id'});

// pass model it using module.exports
module.exports = mongoose.model('Bars',Bars);
