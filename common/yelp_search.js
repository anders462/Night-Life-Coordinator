(function(){


'use strict'

var Yelp = require('yelp');

module.exports = function (req, res,next){


// create instance of yelp client obj using credentials
  var client = new Yelp({
      "consumer_key": process.env.CONSUMER_KEY,
      "consumer_secret": process.env.CONSUMER_SECRET,
      "token": process.env.YELP_TOKEN,
      "token_secret": process.env.YELP_TOKEN_SECRET
  });

//search yelp suing client, with terms "bar"
    client.search({
      term: "bar",
      location: req.query.location
      //handle success
    }).then(function (data) {
      req.bars = data.businesses;
      console.log("bars",req.bars);
      next();
      // handles errors
    }).catch(function (err) {
      res.status(404).json({success: false, message: "Data unavailable for location"});
      });

  };






})();
