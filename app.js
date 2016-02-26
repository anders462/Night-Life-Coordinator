var express = require('express');
var app = express();
var exports = module.exports = {};

app.get('/', function(req, res){
  res.send('Hello Worl');
});

var server = app.listen(9000, function(){
  console.log('Magic is happening on port 9000');
});

exports.closeServer = function(){
  server.close();
};
