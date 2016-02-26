(function(){

'use strict'

var express = require('express'),
    yelpSearch = require('../common/yelp_search'), //yelp search module
    Bar = require('../models/bars.js'), // bars data base
    tokenVerify = require('../common/token_verify'); //token verification module

module.exports = function(app){

// ----->>>>API ROUTES<<<<<-----------//


app.route('/api/bars')
    //READ: get all saved bars database
   .get(function(req,res){
     Bar.find({},function(err,doc){
       if (err) throw err;
       res.json(doc);
     })

   })
   //CREATE: add new bar to database
   .post(tokenVerify,function(req,res){
     //check if bar exists
     Bar.findOne({name: req.body.name,location: req.body.location}, function(err, result){
       if (err) throw err;

       console.log(result);
       if (!result) {

         var bar = new Bar({name: req.body.name,location: req.body.location, going:[{username: req.decoded._doc.username,confirmed: true}]});
         bar.save({new:true},function(err,doc){
           if (err) throw err;
           res.status(200).json({success: true, message: doc});
         })

       } else {
          res.status(400).json({success: false, message: "Bar already exist in db",data: result});

       }
     });

   });

//UPDATE: bar with "id" visting status for username
app.route('/api/bars/:id')
   .put(tokenVerify,function(req,res){
     //check if bar with name at specific location is in db
     Bar.findOne({id: req.params.id}, function(err,doc){
       if (err) throw err;
       //check of bar is in db
       console.log("length: ", doc);
       if (doc){
       var found = false;
       console.log(req.decoded._doc.username);
       doc.going.forEach(function(elem){
         //check if user with username found in this bar
          if (elem.username === req.decoded._doc.username){
            console.log(elem.username + '::: ' + req.decoded._doc.username);
            elem.confirmed = !elem.confirmed; //change confirmed status
            found = true;
          }
        });
        // if username was not found as on of those going to bar, add to username to array
        // with confirmed true;
        if (!found){
          Bar.findOneAndUpdate({id: req.params.id},
            {$addToSet: {going:{username: req.decoded._doc.username,confirmed: true}}}, {new:true}, function(err, doc){
              if (err) throw err;
              res.status(200).json({success: true, message: doc});
           });
        } //username already exist in going object but changed confirmation true if false and vice versa
         else {
          console.log(doc.going);
           Bar.findOneAndUpdate({id: req.params.id}, {$set: {going: doc.going}}, {new:true}, function(err,doc){
            if (err) throw err;
              res.status(200).json({success: true, message: doc});
          });

        }
      }
      else {
          res.status(404).json({success: false, message: "Bar with id doesn't exist"});
        }
    });
   });



 // API FOR YELP SEARCH. NOT Part of RESTfull Routes
 // calls yelp search API returns specific properties and an empty "going" array. Merging
 // data from database api call get("/api/bars") need to be done in client
app.route('/api/search')
   //calls yelp search module and if succesful return data in req.bars
   //see yelp search module for specific error messages
   .get(yelpSearch,function(req,res){
    // Map some specific bar properties to be returned to client
     var bar_info = req.bars.map(function(bar){
       return {name: bar.name, rating_img_url: bar.rating_img_url,
          url: bar.url, image_url: bar.image_url, snippet_text: bar.snippet_text, going: [], id: null};
     })

     res.status(200).json({success: true, message: bar_info});

   });

};

})();
