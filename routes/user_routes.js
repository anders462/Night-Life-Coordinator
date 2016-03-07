
//Refacturing module into a constructor

(function(){

'use strict'

var User = require('../models/user'), // get mongoose user model
    bcrypt = require('bcrypt'),
    tokenVerify = require('../common/token_verify'), //token verification module
    jwt = require('jsonwebtoken'); // used to create, assign and verify tokens


module.exports =  function(app){

  //AUTHENTICATE USER
  app.post('/api/login', function(req,res){

    console.log("LOGIN ATTEMPT")
  //find user
  User.findOne({username: req.body.username}, function(err,user){
    if (err) {
      console.log("error db")
      throw err;
    }

    if (!user){
      res.status(401).json({success:false, message: "Authentication failed. User not found!"});
    } else if (user) {

      //check if password matches
      bcrypt.compare(req.body.password, user.password, function(err, auth) {
        if (!auth){
          res.status(401).json({success: false, message: "Authentication failed. Wrong password!"});
        } else {
          // if user is found and password is correct
          // create token
          user.password="fake password";
          jwt.sign(user, process.env.TOKEN_SECRET,
          {expiresIn: 86400}, function(token){
            // return the information including token as JSON
            console.log(token);
            res.status(200).json({success: true, message: 'Token sent', token: token, user: user.username });
          });
        }

      }); //end bcrypt callback
     }

    }); //end MongoDB callback
  });


//REGISTER NEW USER
app.post('/api/register', function(req, res) {

      User.findOne({username: req.body.username}, function(err,user){
        if(err) throw err;
        // check if username is unique
        if (!user){
          //encrypt password
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
              if (err) throw err;

            // create new user
              var newUser = new User({
                username: req.body.username,
                password: hash,
                admin: false
              });
              //save user to db
              newUser.save(function(err) {
                if (err) throw err;
                console.log('User saved successfully');
                res.status(200).json({ success: true, message: "New user created and saved" });

              });
        });
      });

       } else {
         res.status(403).json({ success: false, message: "Username already exists" });
       }
     });
});


//UPDATE PASSWORD
app.put('/api/update',tokenVerify, function(req,res){
  User.findOne({username: req.decoded._doc.username},{password:1, _id:0}, function(err,user){
    if (err) throw err;
    //check if password matches
    bcrypt.compare(req.body.oldPassword, user.password, function(err, auth) {
      if (err) throw err;
        //if not authorized
        if (!auth){
          res.status(401).json({success: false, message: "Authentication failed. Wrong password!"});
        } else {
          //encrypt new password
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
              if (err) throw err;

            //update oldPassword hash with newPassword hash
            User.findOneAndUpdate({username: req.decoded._doc.username}, {password: hash}, function(err,user) {
                if (err) throw err;
                res.status(200).json({ success: true, message: "New password saved" });

              });
           });
          });
        }
     });
  });
});

}


})();
