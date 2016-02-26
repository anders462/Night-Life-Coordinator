(function(){


var    jwt = require('jsonwebtoken'); // used to create, assign and verify tokens

module.exports =   function(req,res,next){
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    //decode token
    if (token) {
      console.log("token",token);

      //verify secret and checks exp
      jwt.verify(token, process.env.TOKEN_SECRET, function(err,decoded){
        if (err) {
          return res.status(401).json({success: false, message: "Failed to authenticate token"});
        } else {
          //if everthing is good, safe to request for use in other routes
          req.decoded = decoded;
          console.log(req.decoded._doc.username);
          console.log("token verified");
          next();
        }
      });
    } else {

      // if there is no token, return error
      return res.status(401).send({success: false, message: 'No token provided'});
    }

  };

})();
